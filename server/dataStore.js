import mongoose from 'mongoose';
import UserMongoose from './models/User.js';
import CourseMongoose from './models/Course.js';
import FavoriteMongoose from './models/Favorite.js';
import LearningHistoryMongoose from './models/LearningHistory.js';
import { coursesData } from './data/coursesData.js';
import bcrypt from 'bcryptjs';

// In-Memory store as instant reliable fallback when MongoDB server is not locally running
class MemoryCollection {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  generateId() {
    return (
      Math.floor(Date.now() / 1000).toString(16) +
      'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
    ).toLowerCase();
  }

  async find(query = {}) {
    let result = [...this.items];
    if (query.category) {
      result = result.filter((item) => item.category === query.category);
    }
    if (query.$or) {
      result = result.filter((item) =>
        query.$or.some((condition) => {
          for (let key in condition) {
            const regex = condition[key];
            if (item[key] && regex.test(String(item[key]))) {
              return true;
            }
          }
          return false;
        })
      );
    }
    if (query.user) {
      result = result.filter(
        (item) => item.user && item.user.toString() === query.user.toString()
      );
    }
    if (query.course) {
      result = result.filter(
        (item) => item.course && item.course.toString() === query.course.toString()
      );
    }

    // Helper for chained calls like .sort() and .populate()
    const chainable = {
      items: result,
      sort(criteria) {
        return this;
      },
      populate(field) {
        if (field === 'course') {
          this.items = this.items.map((entry) => {
            const courseObj = courseStore.items.find(
              (c) => c._id.toString() === (entry.course ? entry.course.toString() : '')
            );
            return {
              ...entry,
              course: courseObj || null,
            };
          });
        }
        return this;
      },
      then(resolve) {
        resolve(this.items);
      },
    };

    return chainable;
  }

  async findOne(query = {}) {
    let item = this.items.find((el) => {
      for (let k in query) {
        if (k === 'user' && el.user) {
          if (el.user.toString() !== query.user.toString()) return false;
        } else if (k === 'course' && el.course) {
          if (el.course.toString() !== query.course.toString()) return false;
        } else if (el[k] !== query[k]) {
          return false;
        }
      }
      return true;
    });

    if (!item) return null;

    // Return a mutable copy with save() method
    const collection = this;
    return {
      ...item,
      async save() {
        const idx = collection.items.findIndex(
          (x) => x._id.toString() === item._id.toString()
        );
        if (idx !== -1) {
          collection.items[idx] = { ...this };
        }
        return this;
      },
    };
  }

  async findById(id) {
    const item = this.items.find((x) => x._id.toString() === id.toString());
    if (!item) return null;
    const collection = this;
    return {
      ...item,
      async save() {
        const idx = collection.items.findIndex(
          (x) => x._id.toString() === item._id.toString()
        );
        if (idx !== -1) {
          collection.items[idx] = { ...this };
        }
        return this;
      },
    };
  }

  async create(data) {
    const doc = {
      _id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(doc);
    return doc;
  }

  async insertMany(array) {
    const docs = array.map((item) => ({
      _id: this.generateId(),
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    this.items.push(...docs);
    return docs;
  }

  async countDocuments(query = {}) {
    if (Object.keys(query).length === 0) return this.items.length;
    let count = 0;
    for (const item of this.items) {
      let match = true;
      for (const k in query) {
        if (item[k] !== query[k]) match = false;
      }
      if (match) count++;
    }
    return count;
  }

  async findByIdAndDelete(id) {
    const idx = this.items.findIndex((x) => x._id.toString() === id.toString());
    if (idx !== -1) {
      return this.items.splice(idx, 1)[0];
    }
    return null;
  }
}

export const userStore = new MemoryCollection('User');
export const courseStore = new MemoryCollection('Course');
export const favoriteStore = new MemoryCollection('Favorite');
export const historyStore = new MemoryCollection('LearningHistory');

let isMongooseActive = false;

export function setMongooseActive(active) {
  isMongooseActive = active;
}

export function getDb() {
  if (isMongooseActive && mongoose.connection.readyState === 1) {
    return {
      isMongo: true,
      User: UserMongoose,
      Course: CourseMongoose,
      Favorite: FavoriteMongoose,
      LearningHistory: LearningHistoryMongoose,
    };
  }

  return {
    isMongo: false,
    User: userStore,
    Course: courseStore,
    Favorite: favoriteStore,
    LearningHistory: historyStore,
  };
}

export async function seedMemoryData() {
  if (courseStore.items.length === 0) {
    await courseStore.insertMany(coursesData);
    console.log(`[In-Memory DB] Berhasil memuat ${coursesData.length} materi kursus.`);
  }

  const existingDemo = await userStore.findOne({ email: 'siswa@skilllearn.id' });
  if (!existingDemo) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    await userStore.create({
      name: 'Budi Mahasiswa Pratama',
      email: 'siswa@skilllearn.id',
      password: hashedPassword,
      role: 'Mahasiswa',
      institution: 'Universitas Pendidikan Indonesia',
    });
    console.log('[In-Memory DB] Akun demo siap: siswa@skilllearn.id / password123');
  }
}
