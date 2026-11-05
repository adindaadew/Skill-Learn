import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { api } from '../services/api';
import { colors } from '../theme/colors';

const CourseDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [course, setCourse] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [history, setHistory] = useState(null);
  const [activeTab, setActiveTab] = useState('article'); // 'article', 'video', 'quiz', 'practice'
  const [loading, setLoading] = useState(true);

  // Quiz State
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Practice State
  const [practiceNotes, setPracticeNotes] = useState('');
  const [practiceLink, setPracticeLink] = useState('');
  const [practiceSubmitting, setPracticeSubmitting] = useState(false);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const data = await api.getCourseDetail(id);
      setCourse(data.course);
      setIsFavorited(data.isFavorited);
      setHistory(data.history);

      if (data.history) {
        if (data.history.practiceNotes) setPracticeNotes(data.history.practiceNotes);
        if (data.history.practiceLink) setPracticeLink(data.history.practiceLink);
        if (data.history.quizScore !== null && data.history.quizScore !== undefined) {
          setQuizScore(data.history.quizScore);
          setQuizSubmitted(true);
        }
      }
    } catch (err) {
      console.log('Error fetching detail:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!course) return;
    try {
      const res = await api.toggleFavorite(course._id);
      setIsFavorited(res.isFavorited);
      Alert.alert('Informasi', res.message);
    } catch (err) {
      console.log(err);
    }
  };

  const markModuleCompleted = async (moduleType) => {
    if (!course) return;
    try {
      const res = await api.updateHistory({
        courseId: course._id,
        moduleType,
      });
      setHistory(res.history);
      Alert.alert('Sukses', `Modul ${moduleType} berhasil ditandai selesai!`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuizSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (!course?.quiz) return;

    let correctCount = 0;
    const total = course.quiz.length;

    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / total) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    try {
      const res = await api.updateHistory({
        courseId: course._id,
        moduleType: 'quiz',
        quizScore: calculatedScore,
        quizTotal: total,
      });
      setHistory(res.history);
      Alert.alert('Hasil Kuis', `Skor Anda: ${calculatedScore} / 100`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitPractice = async () => {
    if (!course || !practiceNotes.trim()) return;

    try {
      setPracticeSubmitting(true);
      const res = await api.updateHistory({
        courseId: course._id,
        moduleType: 'practice',
        practiceNotes,
        practiceLink,
      });
      setHistory(res.history);
      Alert.alert('Sukses', 'Jawaban latihan praktik berhasil disimpan!');
    } catch (err) {
      console.log(err);
    } finally {
      setPracticeSubmitting(false);
    }
  };

  const openVideo = (url) => {
    if (url) Linking.openURL(url);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.centerText}>Memuat materi pembelajaran...</Text>
      </SafeAreaView>
    );
  }

  if (!course) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.centerText}>Materi tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  const completed = history?.completedModules || {};
  const progressPercent = history?.progressPercent || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Course Banner - Solid Blue */}
        <View style={styles.banner}>
          <View style={styles.bannerTop}>
            <View style={styles.badgeRow}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{course.category}</Text>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>{course.level}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.favBtn} onPress={handleToggleFavorite}>
              <Feather
                name="bookmark"
                size={20}
                color={isFavorited ? '#FFFFFF' : '#BFDBFE'}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.bannerTitle}>{course.title}</Text>
          <Text style={styles.bannerSummary}>{course.summary}</Text>

          <View style={styles.instructorRow}>
            <Feather name="user" size={14} color="#BFDBFE" />
            <Text style={styles.instructorText}>
              {course.instructor?.name} &bull; {course.instructor?.role}
            </Text>
          </View>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Progres Pembelajaran</Text>
            <Text style={styles.progressPercentText}>{progressPercent}%</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: history?.isCompleted ? colors.success : colors.primary,
                },
              ]}
            />
          </View>

          {/* Module 4-Pillars Checklist */}
          <View style={styles.checklistGrid}>
            <View style={[styles.checkItem, completed.article && styles.checkItemDone]}>
              <Feather
                name={completed.article ? 'check-circle' : 'circle'}
                size={14}
                color={completed.article ? colors.success : colors.textMuted}
              />
              <Text style={styles.checkText}>1. Artikel</Text>
            </View>

            <View style={[styles.checkItem, completed.video && styles.checkItemDone]}>
              <Feather
                name={completed.video ? 'check-circle' : 'circle'}
                size={14}
                color={completed.video ? colors.success : colors.textMuted}
              />
              <Text style={styles.checkText}>2. Video</Text>
            </View>

            <View style={[styles.checkItem, completed.quiz && styles.checkItemDone]}>
              <Feather
                name={completed.quiz ? 'check-circle' : 'circle'}
                size={14}
                color={completed.quiz ? colors.success : colors.textMuted}
              />
              <Text style={styles.checkText}>
                3. Kuis {history?.quizScore !== null && history?.quizScore !== undefined ? `(${history.quizScore})` : ''}
              </Text>
            </View>

            <View style={[styles.checkItem, completed.practice && styles.checkItemDone]}>
              <Feather
                name={completed.practice ? 'check-circle' : 'circle'}
                size={14}
                color={completed.practice ? colors.success : colors.textMuted}
              />
              <Text style={styles.checkText}>4. Praktik</Text>
            </View>
          </View>
        </View>

        {/* 4 Tabs Selector */}
        <View style={styles.tabBar}>
          {[
            { key: 'article', label: 'Artikel', icon: 'file-text' },
            { key: 'video', label: 'Video', icon: 'video' },
            { key: 'quiz', label: 'Kuis', icon: 'help-circle' },
            { key: 'practice', label: 'Praktik', icon: 'edit-3' },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
              >
                <Feather
                  name={tab.icon}
                  size={16}
                  color={isActive ? colors.primary : colors.textMuted}
                />
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tab Content: Artikel */}
        {activeTab === 'article' && (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>{course.article?.title}</Text>
            <Text style={styles.articleBody}>{course.article?.content}</Text>

            {/* Key Takeaways */}
            {course.article?.keyTakeaways?.length > 0 && (
              <View style={styles.takeawaysBox}>
                <View style={styles.takeawaysHeader}>
                  <Feather name="award" size={16} color={colors.primary} />
                  <Text style={styles.takeawaysTitle}>Poin Kunci Pembelajaran:</Text>
                </View>
                {course.article.keyTakeaways.map((item, idx) => (
                  <Text key={idx} style={styles.takeawayItem}>
                    &bull; {item}
                  </Text>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={[styles.actionButton, completed.article && styles.actionButtonDone]}
              onPress={() => markModuleCompleted('article')}
            >
              <Feather
                name={completed.article ? 'check' : 'check-circle'}
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {completed.article ? 'Sudah Ditandai Dibaca' : 'Tandai Selesai Membaca'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tab Content: Video */}
        {activeTab === 'video' && (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>{course.video?.title}</Text>
            <View style={styles.videoMetaRow}>
              <Feather name="clock" size={14} color={colors.textMuted} />
              <Text style={styles.videoMetaText}>Durasi: {course.video?.duration}</Text>
            </View>

            <View style={styles.videoPlaceholder}>
              <Feather name="play-circle" size={48} color={colors.primary} />
              <Text style={styles.videoPlaceholderText}>Video Tutorial Edukasi</Text>
              <TouchableOpacity
                style={styles.openVideoBtn}
                onPress={() => openVideo(course.video?.youtubeUrl)}
              >
                <Feather name="external-link" size={16} color="#FFFFFF" />
                <Text style={styles.openVideoBtnText}>Tonton Video di YouTube</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.videoDescTitle}>Ringkasan Video:</Text>
            <Text style={styles.videoDescText}>{course.video?.description}</Text>

            <TouchableOpacity
              style={[styles.actionButton, completed.video && styles.actionButtonDone]}
              onPress={() => markModuleCompleted('video')}
            >
              <Feather
                name={completed.video ? 'check' : 'check-circle'}
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {completed.video ? 'Sudah Ditandai Ditonton' : 'Tandai Selesai Menonton'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tab Content: Kuis */}
        {activeTab === 'quiz' && (
          <View style={styles.contentCard}>
            <View style={styles.quizHeaderRow}>
              <Text style={styles.sectionTitle}>Kuis Pemahaman</Text>
              {quizSubmitted && (
                <View
                  style={[
                    styles.scoreBadge,
                    {
                      backgroundColor: quizScore >= 70 ? colors.successLight : colors.dangerLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreText,
                      { color: quizScore >= 70 ? colors.success : colors.danger },
                    ]}
                  >
                    Skor: {quizScore} / 100
                  </Text>
                </View>
              )}
            </View>

            {course.quiz?.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <View key={qIdx} style={styles.quizBox}>
                  <Text style={styles.questionText}>
                    {qIdx + 1}. {q.question}
                  </Text>

                  {q.options?.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optStyle = styles.optionItem;
                    if (quizSubmitted) {
                      if (optIdx === q.correctAnswerIndex) {
                        optStyle = [styles.optionItem, styles.optionCorrect];
                      } else if (isSelected) {
                        optStyle = [styles.optionItem, styles.optionWrong];
                      }
                    } else if (isSelected) {
                      optStyle = [styles.optionItem, styles.optionSelected];
                    }

                    return (
                      <TouchableOpacity
                        key={optIdx}
                        disabled={quizSubmitted}
                        style={optStyle}
                        onPress={() => handleQuizSelect(qIdx, optIdx)}
                      >
                        <View style={styles.radioCircle}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <Text style={styles.optionText}>{opt}</Text>
                      </TouchableOpacity>
                    );
                  })}

                  {quizSubmitted && (
                    <View style={styles.explanationBox}>
                      <Text style={styles.explanationTitle}>Pembahasan:</Text>
                      <Text style={styles.explanationText}>{q.explanation}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {!quizSubmitted ? (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < course.quiz?.length}
              >
                <Feather name="check" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Kirim & Nilai Jawaban Kuis</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.textMuted }]}
                onPress={() => {
                  setSelectedAnswers({});
                  setQuizSubmitted(false);
                }}
              >
                <Feather name="rotate-ccw" size={16} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Ulangi Kuis</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Tab Content: Praktik */}
        {activeTab === 'practice' && (
          <View style={styles.contentCard}>
            <Text style={styles.sectionTitle}>{course.practice?.title}</Text>

            <View style={styles.scenarioBox}>
              <Text style={styles.scenarioHeading}>Skenario Studi Kasus:</Text>
              <Text style={styles.scenarioText}>{course.practice?.scenario}</Text>

              <Text style={styles.scenarioHeading}>Tugas Praktik:</Text>
              {course.practice?.tasks?.map((t, idx) => (
                <Text key={idx} style={styles.taskText}>
                  {idx + 1}. {t}
                </Text>
              ))}
            </View>

            <Text style={styles.inputTitle}>Ringkasan Hasil Pengerjaan / Refleksi:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Tuliskan catatan implementasi, kode, atau refleksi belajar Anda..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={practiceNotes}
              onChangeText={setPracticeNotes}
            />

            <Text style={styles.inputTitle}>Tautan Repositori / File (Opsional):</Text>
            <TextInput
              style={styles.textInput}
              placeholder="https://github.com/username/project"
              placeholderTextColor="#94A3B8"
              value={practiceLink}
              onChangeText={setPracticeLink}
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSubmitPractice}
              disabled={practiceSubmitting || !practiceNotes.trim()}
            >
              {practiceSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <View style={styles.btnRow}>
                  <Feather name="send" size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Simpan Jawaban Praktik</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  banner: {
    backgroundColor: colors.primary,
    padding: 20,
  },
  bannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  categoryBadge: {
    backgroundColor: colors.primaryHover,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  levelBadge: {
    backgroundColor: colors.primaryHover,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  favBtn: {
    padding: 6,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 8,
  },
  bannerSummary: {
    fontSize: 12,
    color: '#DBEAFE',
    lineHeight: 18,
    marginBottom: 12,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  instructorText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  progressPercentText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
  },
  checklistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  checkItemDone: {
    backgroundColor: colors.successLight,
    borderColor: '#BBF7D0',
  },
  checkText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  tabButtonActive: {
    backgroundColor: colors.primaryLight,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 12,
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
  },
  articleBody: {
    fontSize: 13,
    lineHeight: 22,
    color: '#334155',
    marginBottom: 16,
  },
  takeawaysBox: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  takeawaysHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  takeawaysTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  takeawayItem: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  actionButtonDone: {
    backgroundColor: colors.success,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  videoMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  videoMetaText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  videoPlaceholder: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  videoPlaceholderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 12,
  },
  openVideoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  openVideoBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  videoDescTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  videoDescText: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 16,
  },
  quizHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '800',
  },
  quizBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 10,
    lineHeight: 18,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionCorrect: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  optionWrong: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 12,
    color: colors.text,
    flex: 1,
  },
  explanationBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
  },
  explanationTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 2,
  },
  explanationText: {
    fontSize: 11,
    color: '#1E3A8A',
    lineHeight: 16,
  },
  scenarioBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  scenarioHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  scenarioText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 2,
  },
  inputTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
    fontSize: 12,
    color: colors.text,
    textAlignVertical: 'top',
    height: 80,
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 10,
    fontSize: 12,
    color: colors.text,
    marginBottom: 14,
  },
});

export default CourseDetailScreen;
