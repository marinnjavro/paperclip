import { useState } from "react";
import { useNavigate } from "@/lib/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Target,
  Sparkles,
  Play,
  Star,
  Clock,
  BarChart2,
  Zap,
  Check,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5;

interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface QuizQuestion {
  id: string;
  subjectId: string;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface GoalOption {
  id: string;
  label: string;
  description: string;
}

interface CourseRecommendation {
  subjectId: string;
  level: "beginner" | "intermediate" | "advanced";
  courseName: string;
  description: string;
  duration: string;
  lessons: number;
  firstLesson: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const SUBJECTS: Subject[] = [
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    description: "General-purpose programming",
    color: "text-blue-400",
  },
  {
    id: "webdev",
    name: "Web Development",
    icon: "🌐",
    description: "HTML, CSS, JavaScript",
    color: "text-orange-400",
  },
  {
    id: "data",
    name: "Data Science",
    icon: "📊",
    description: "Analysis & visualization",
    color: "text-green-400",
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: "🤖",
    description: "AI & model training",
    color: "text-purple-400",
  },
  {
    id: "sql",
    name: "SQL & Databases",
    icon: "🗄️",
    description: "Data storage & queries",
    color: "text-yellow-400",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: "⚙️",
    description: "CI/CD, containers, cloud",
    color: "text-cyan-400",
  },
];

const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  python: [
    {
      id: "py1",
      subjectId: "python",
      question: "What does the following code output?\n\nprint(type([]))",
      options: ["<class 'list'>", "<class 'array'>", "list", "[]"],
      correctIndex: 0,
      difficulty: "beginner",
    },
    {
      id: "py2",
      subjectId: "python",
      question: "Which of these is a valid Python dictionary?",
      options: [
        "{name: 'Alice', age: 30}",
        '{"name": "Alice", "age": 30}',
        "[name=Alice, age=30]",
        "(name=Alice, age=30)",
      ],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "py3",
      subjectId: "python",
      question: "What is a Python decorator?",
      options: [
        "A function that modifies another function",
        "A comment-style annotation",
        "A type hint",
        "A class method modifier",
      ],
      correctIndex: 0,
      difficulty: "intermediate",
    },
  ],
  webdev: [
    {
      id: "web1",
      subjectId: "webdev",
      question: "Which CSS property controls the spacing inside an element?",
      options: ["margin", "padding", "border", "spacing"],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "web2",
      subjectId: "webdev",
      question: "What does 'async/await' do in JavaScript?",
      options: [
        "Handles synchronous operations",
        "Defines class methods",
        "Handles asynchronous operations with cleaner syntax",
        "Creates event listeners",
      ],
      correctIndex: 2,
      difficulty: "intermediate",
    },
    {
      id: "web3",
      subjectId: "webdev",
      question: "In React, what hook is used for side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctIndex: 1,
      difficulty: "intermediate",
    },
  ],
  data: [
    {
      id: "data1",
      subjectId: "data",
      question: "Which Python library is primarily used for data manipulation?",
      options: ["NumPy", "Matplotlib", "Pandas", "Seaborn"],
      correctIndex: 2,
      difficulty: "beginner",
    },
    {
      id: "data2",
      subjectId: "data",
      question: "What does 'df.dropna()' do in pandas?",
      options: [
        "Drops all rows",
        "Removes rows with missing values",
        "Fills missing values with 0",
        "Renames columns",
      ],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "data3",
      subjectId: "data",
      question: "What is the purpose of a confusion matrix?",
      options: [
        "Visualize data distribution",
        "Evaluate classification model performance",
        "Measure data correlation",
        "Normalize feature values",
      ],
      correctIndex: 1,
      difficulty: "intermediate",
    },
  ],
  ml: [
    {
      id: "ml1",
      subjectId: "ml",
      question: "What is overfitting in machine learning?",
      options: [
        "When a model is too simple",
        "When a model memorizes training data but fails on new data",
        "When training takes too long",
        "When features are correlated",
      ],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "ml2",
      subjectId: "ml",
      question: "Which algorithm is commonly used for classification tasks?",
      options: [
        "Linear Regression",
        "K-Means Clustering",
        "Random Forest",
        "PCA",
      ],
      correctIndex: 2,
      difficulty: "intermediate",
    },
    {
      id: "ml3",
      subjectId: "ml",
      question: "What does a neural network's 'epoch' refer to?",
      options: [
        "A single neuron",
        "One complete pass through the training dataset",
        "A layer in the network",
        "The learning rate",
      ],
      correctIndex: 1,
      difficulty: "intermediate",
    },
  ],
  sql: [
    {
      id: "sql1",
      subjectId: "sql",
      question: "Which SQL statement retrieves data from a table?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      correctIndex: 2,
      difficulty: "beginner",
    },
    {
      id: "sql2",
      subjectId: "sql",
      question: "What does 'JOIN' do in SQL?",
      options: [
        "Merges tables based on a related column",
        "Adds a new column",
        "Filters rows by condition",
        "Groups rows by value",
      ],
      correctIndex: 0,
      difficulty: "beginner",
    },
    {
      id: "sql3",
      subjectId: "sql",
      question: "Which of these is a NoSQL database?",
      options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      correctIndex: 2,
      difficulty: "intermediate",
    },
  ],
  devops: [
    {
      id: "dev1",
      subjectId: "devops",
      question: "What is Docker primarily used for?",
      options: [
        "Writing code",
        "Containerizing applications",
        "Managing databases",
        "Running tests",
      ],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "dev2",
      subjectId: "devops",
      question: "What does CI/CD stand for?",
      options: [
        "Code Integration / Code Deployment",
        "Continuous Integration / Continuous Delivery",
        "Cloud Infrastructure / Cloud Deployment",
        "Core Interface / Core Deployment",
      ],
      correctIndex: 1,
      difficulty: "beginner",
    },
    {
      id: "dev3",
      subjectId: "devops",
      question: "Which tool is used for infrastructure-as-code?",
      options: ["Jenkins", "Kubernetes", "Terraform", "Nginx"],
      correctIndex: 2,
      difficulty: "intermediate",
    },
  ],
};

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: "career",
    label: "Career change",
    description: "Switch into a tech role",
  },
  {
    id: "project",
    label: "Build a project",
    description: "Create something specific",
  },
  {
    id: "upskill",
    label: "Upskill at work",
    description: "Improve current job performance",
  },
  {
    id: "freelance",
    label: "Freelance / consulting",
    description: "Take on client projects",
  },
  {
    id: "hobby",
    label: "Personal interest",
    description: "Learn for fun or curiosity",
  },
  {
    id: "study",
    label: "Academic study",
    description: "Supplement formal education",
  },
];

function getCourseRecommendation(
  subjectId: string,
  correctCount: number,
  totalQuestions: number
): CourseRecommendation {
  const pct = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  const level: "beginner" | "intermediate" | "advanced" =
    pct >= 0.8 ? "advanced" : pct >= 0.5 ? "intermediate" : "beginner";

  const courses: Record<string, Record<string, CourseRecommendation>> = {
    python: {
      beginner: {
        subjectId: "python",
        level: "beginner",
        courseName: "Python Fundamentals",
        description:
          "Start from scratch: variables, loops, functions, and data structures.",
        duration: "6 weeks",
        lessons: 24,
        firstLesson: "Your First Python Program",
      },
      intermediate: {
        subjectId: "python",
        level: "intermediate",
        courseName: "Python for Builders",
        description:
          "OOP, file I/O, APIs, and building real projects in Python.",
        duration: "5 weeks",
        lessons: 20,
        firstLesson: "Classes and Objects",
      },
      advanced: {
        subjectId: "python",
        level: "advanced",
        courseName: "Advanced Python Patterns",
        description:
          "Decorators, async programming, metaclasses, and performance optimization.",
        duration: "4 weeks",
        lessons: 16,
        firstLesson: "Decorators Deep Dive",
      },
    },
    webdev: {
      beginner: {
        subjectId: "webdev",
        level: "beginner",
        courseName: "Web Development from Zero",
        description: "HTML structure, CSS styling, and JavaScript basics.",
        duration: "8 weeks",
        lessons: 32,
        firstLesson: "Building Your First Webpage",
      },
      intermediate: {
        subjectId: "webdev",
        level: "intermediate",
        courseName: "Modern JavaScript & React",
        description: "ES6+, component architecture, state management, and APIs.",
        duration: "6 weeks",
        lessons: 24,
        firstLesson: "ES6 Arrow Functions & Modules",
      },
      advanced: {
        subjectId: "webdev",
        level: "advanced",
        courseName: "Full-Stack Architecture",
        description: "Next.js, server-side rendering, auth, and deployment.",
        duration: "5 weeks",
        lessons: 20,
        firstLesson: "Next.js App Router",
      },
    },
    data: {
      beginner: {
        subjectId: "data",
        level: "beginner",
        courseName: "Data Analysis Essentials",
        description:
          "Pandas, NumPy, and creating insights from real datasets.",
        duration: "5 weeks",
        lessons: 20,
        firstLesson: "Loading Your First Dataset",
      },
      intermediate: {
        subjectId: "data",
        level: "intermediate",
        courseName: "Data Visualization & Storytelling",
        description:
          "Matplotlib, Plotly, dashboards, and communicating with data.",
        duration: "4 weeks",
        lessons: 16,
        firstLesson: "Chart Types and When to Use Them",
      },
      advanced: {
        subjectId: "data",
        level: "advanced",
        courseName: "Advanced Data Engineering",
        description: "Pipelines, data warehousing, dbt, and Spark basics.",
        duration: "6 weeks",
        lessons: 24,
        firstLesson: "Building ETL Pipelines",
      },
    },
    ml: {
      beginner: {
        subjectId: "ml",
        level: "beginner",
        courseName: "Machine Learning Foundations",
        description:
          "Supervised learning, scikit-learn, and your first models.",
        duration: "6 weeks",
        lessons: 24,
        firstLesson: "What Is Machine Learning?",
      },
      intermediate: {
        subjectId: "ml",
        level: "intermediate",
        courseName: "Applied Machine Learning",
        description:
          "Feature engineering, model selection, and real-world projects.",
        duration: "5 weeks",
        lessons: 20,
        firstLesson: "Feature Engineering Techniques",
      },
      advanced: {
        subjectId: "ml",
        level: "advanced",
        courseName: "Deep Learning & Neural Networks",
        description:
          "PyTorch, CNNs, LLM fine-tuning, and production deployment.",
        duration: "8 weeks",
        lessons: 32,
        firstLesson: "Neural Network Fundamentals",
      },
    },
    sql: {
      beginner: {
        subjectId: "sql",
        level: "beginner",
        courseName: "SQL from Scratch",
        description: "SELECT, JOIN, GROUP BY, and querying real databases.",
        duration: "4 weeks",
        lessons: 16,
        firstLesson: "Your First SQL Query",
      },
      intermediate: {
        subjectId: "sql",
        level: "intermediate",
        courseName: "Database Design & Optimization",
        description: "Schema design, indexes, CTEs, and query optimization.",
        duration: "4 weeks",
        lessons: 16,
        firstLesson: "Relational Data Modeling",
      },
      advanced: {
        subjectId: "sql",
        level: "advanced",
        courseName: "Advanced SQL & NoSQL",
        description:
          "Window functions, stored procedures, and MongoDB/Redis.",
        duration: "4 weeks",
        lessons: 16,
        firstLesson: "Window Functions Mastery",
      },
    },
    devops: {
      beginner: {
        subjectId: "devops",
        level: "beginner",
        courseName: "DevOps Fundamentals",
        description: "Linux, Git, Docker basics, and CI/CD pipelines.",
        duration: "6 weeks",
        lessons: 24,
        firstLesson: "Linux Command Line Essentials",
      },
      intermediate: {
        subjectId: "devops",
        level: "intermediate",
        courseName: "Docker & Kubernetes",
        description:
          "Container orchestration, Helm charts, and cloud deployment.",
        duration: "5 weeks",
        lessons: 20,
        firstLesson: "Docker Compose in Practice",
      },
      advanced: {
        subjectId: "devops",
        level: "advanced",
        courseName: "Cloud & Infrastructure as Code",
        description:
          "AWS/GCP, Terraform, GitOps, and site reliability engineering.",
        duration: "7 weeks",
        lessons: 28,
        firstLesson: "Terraform State Management",
      },
    },
  };

  return (
    courses[subjectId]?.[level] ?? {
      subjectId,
      level: "beginner",
      courseName: "Introduction Course",
      description: "Personalized path based on your assessment results.",
      duration: "4 weeks",
      lessons: 16,
      firstLesson: "Getting Started",
    }
  );
}

// ─── Step Components ─────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isDone = current > stepNum;
        const isActive = current === stepNum;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                isDone &&
                  "bg-primary text-primary-foreground",
                isActive &&
                  "bg-primary/20 text-primary border border-primary",
                !isDone &&
                  !isActive &&
                  "bg-muted text-muted-foreground"
              )}
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
            </div>
            {i < total - 1 && (
              <div
                className={cn(
                  "h-0.5 w-8",
                  isDone ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Sign Up ─────────────────────────────────────────────────────────

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

function StepSignUp({
  data,
  onChange,
  onNext,
}: {
  data: SignUpData;
  onChange: (d: SignUpData) => void;
  onNext: () => void;
}) {
  const canProceed =
    data.name.trim().length >= 2 &&
    data.email.includes("@") &&
    data.password.length >= 6;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Create your account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get started on your learning journey — takes less than 5 minutes.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            Full name
          </label>
          <Input
            placeholder="Ada Lovelace"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            Email address
          </label>
          <Input
            type="email"
            placeholder="ada@example.com"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted-foreground font-medium">
            Password
          </label>
          <Input
            type="password"
            placeholder="At least 6 characters"
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 2: Placement Assessment ────────────────────────────────────────────

interface PlacementState {
  selectedSubjectIds: string[];
  answers: Record<string, number>; // questionId → chosen option index
  phase: "select" | "quiz";
  currentSubjectIndex: number;
  currentQuestionIndex: number;
}

function StepPlacement({
  state,
  onChange,
  onNext,
  onBack,
}: {
  state: PlacementState;
  onChange: (s: PlacementState) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  if (state.phase === "select") {
    const toggleSubject = (id: string) => {
      const selected = state.selectedSubjectIds.includes(id)
        ? state.selectedSubjectIds.filter((s) => s !== id)
        : [...state.selectedSubjectIds, id];
      onChange({ ...state, selectedSubjectIds: selected });
    };

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold">Choose your subjects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select the areas you want to learn. We'll run a short quiz to place
            you at the right level.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {SUBJECTS.map((subject) => {
            const selected = state.selectedSubjectIds.includes(subject.id);
            return (
              <button
                key={subject.id}
                onClick={() => toggleSubject(subject.id)}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border text-left transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-border/80 hover:bg-accent/30"
                )}
              >
                <span className="text-2xl leading-none mt-0.5">
                  {subject.icon}
                </span>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {subject.description}
                  </span>
                </div>
                {selected && (
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={() =>
              onChange({ ...state, phase: "quiz", currentSubjectIndex: 0, currentQuestionIndex: 0 })
            }
            disabled={state.selectedSubjectIds.length === 0}
          >
            Start placement quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Quiz phase
  const currentSubjectId = state.selectedSubjectIds[state.currentSubjectIndex];
  const questions = QUIZ_QUESTIONS[currentSubjectId] ?? [];
  const question = questions[state.currentQuestionIndex];
  const subject = SUBJECTS.find((s) => s.id === currentSubjectId);

  if (!question || !subject) {
    // This subject has no questions, advance
    const nextSubjectIndex = state.currentSubjectIndex + 1;
    if (nextSubjectIndex < state.selectedSubjectIds.length) {
      onChange({
        ...state,
        currentSubjectIndex: nextSubjectIndex,
        currentQuestionIndex: 0,
      });
    } else {
      onNext();
    }
    return null;
  }

  const answeredKey = question.id;
  const selectedAnswer = state.answers[answeredKey];
  const hasAnswered = selectedAnswer !== undefined;

  const totalQuestions = state.selectedSubjectIds.reduce(
    (sum, sid) => sum + (QUIZ_QUESTIONS[sid]?.length ?? 0),
    0
  );
  const answeredSoFar = Object.keys(state.answers).length;
  const progressPct = totalQuestions > 0 ? (answeredSoFar / totalQuestions) * 100 : 0;

  function handleAnswer(optionIndex: number) {
    if (hasAnswered) return;
    onChange({ ...state, answers: { ...state.answers, [answeredKey]: optionIndex } });
  }

  function handleNext() {
    const nextQuestionIndex = state.currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      onChange({ ...state, currentQuestionIndex: nextQuestionIndex });
    } else {
      const nextSubjectIndex = state.currentSubjectIndex + 1;
      if (nextSubjectIndex < state.selectedSubjectIds.length) {
        onChange({
          ...state,
          currentSubjectIndex: nextSubjectIndex,
          currentQuestionIndex: 0,
        });
      } else {
        onNext();
      }
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{subject.icon}</span>
            <span className="text-sm font-medium">{subject.name}</span>
            <Badge variant="outline" className="text-xs">
              {question.difficulty}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            {answeredSoFar + 1} / {totalQuestions}
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium leading-relaxed whitespace-pre-line">
          {question.question}
        </p>

        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === i;
            const isCorrect = hasAnswered && i === question.correctIndex;
            const isWrong = hasAnswered && isSelected && i !== question.correctIndex;

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-colors",
                  !hasAnswered && "hover:bg-accent/30 hover:border-border/80",
                  isCorrect && "border-green-500 bg-green-500/10 text-green-400",
                  isWrong && "border-destructive bg-destructive/10 text-destructive",
                  isSelected && !isWrong && !isCorrect && "border-primary bg-primary/5",
                  !isSelected && !isCorrect && hasAnswered && "opacity-50"
                )}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {isCorrect && <CheckCircle2 className="h-4 w-4 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div
            className={cn(
              "p-3 rounded-lg text-xs",
              selectedAnswer === question.correctIndex
                ? "bg-green-500/10 text-green-400"
                : "bg-amber-500/10 text-amber-400"
            )}
          >
            {selectedAnswer === question.correctIndex
              ? "Correct! Well done."
              : `The correct answer was: ${question.options[question.correctIndex]}`}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => onChange({ ...state, phase: "select" })}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Change subjects
        </Button>
        <Button onClick={handleNext} disabled={!hasAnswered}>
          {state.currentSubjectIndex < state.selectedSubjectIds.length - 1 ||
          state.currentQuestionIndex < questions.length - 1
            ? "Next question"
            : "See results"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Goal Setting ─────────────────────────────────────────────────────

interface GoalData {
  goalOptionId: string;
  customGoalText: Record<string, string>; // subjectId → custom goal text
}

function StepGoalSetting({
  selectedSubjectIds,
  data,
  onChange,
  onNext,
  onBack,
}: {
  selectedSubjectIds: string[];
  data: GoalData;
  onChange: (d: GoalData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canProceed =
    data.goalOptionId !== "" &&
    selectedSubjectIds.every(
      (id) => (data.customGoalText[id] ?? "").trim().length >= 5
    );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Set your learning goals</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us what you want to achieve so we can build the perfect path.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Primary motivation
          </p>
          <div className="grid grid-cols-2 gap-2">
            {GOAL_OPTIONS.map((opt) => {
              const selected = data.goalOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ ...data, goalOptionId: opt.id })}
                  className={cn(
                    "flex flex-col gap-0.5 p-3 rounded-lg border text-left text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-accent/30"
                  )}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {opt.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Specific goals per subject
          </p>
          {selectedSubjectIds.map((subjectId) => {
            const subject = SUBJECTS.find((s) => s.id === subjectId);
            if (!subject) return null;
            return (
              <div key={subjectId} className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span>{subject.icon}</span>
                  <span>{subject.name}</span>
                </label>
                <Input
                  placeholder={`e.g. "Build a REST API with ${subject.name}"`}
                  value={data.customGoalText[subjectId] ?? ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      customGoalText: {
                        ...data.customGoalText,
                        [subjectId]: e.target.value,
                      },
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Get my recommendations
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 4: Course Recommendations ──────────────────────────────────────────

function StepRecommendations({
  selectedSubjectIds,
  placementAnswers,
  onNext,
  onBack,
}: {
  selectedSubjectIds: string[];
  placementAnswers: Record<string, number>;
  onNext: () => void;
  onBack: () => void;
}) {
  const levelLabel: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  const levelColor: Record<string, string> = {
    beginner: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-purple-400",
  };

  const recommendations = selectedSubjectIds.map((subjectId) => {
    const questions = QUIZ_QUESTIONS[subjectId] ?? [];
    const correctCount = questions.filter(
      (q) => placementAnswers[q.id] === q.correctIndex
    ).length;
    return getCourseRecommendation(subjectId, correctCount, questions.length);
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Your personalized learning path</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Based on your placement results and goals, we've curated the best
          starting point for each subject.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {recommendations.map((rec) => {
          const subject = SUBJECTS.find((s) => s.id === rec.subjectId);
          return (
            <div
              key={rec.subjectId}
              className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{subject?.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{rec.courseName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {subject?.name}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={cn("text-xs shrink-0", levelColor[rec.level])}
                >
                  {levelLabel[rec.level]}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">{rec.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{rec.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{rec.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Play className="h-3.5 w-3.5" />
                  <span>First: {rec.firstLesson}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext}>
          Let's go!
          <Zap className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 5: Welcome ─────────────────────────────────────────────────────────

function StepWelcome({
  name,
  selectedSubjectIds,
  placementAnswers,
  onStartLearning,
}: {
  name: string;
  selectedSubjectIds: string[];
  placementAnswers: Record<string, number>;
  onStartLearning: () => void;
}) {
  const firstSubjectId = selectedSubjectIds[0];
  const subject = SUBJECTS.find((s) => s.id === firstSubjectId);
  const questions = QUIZ_QUESTIONS[firstSubjectId] ?? [];
  const correctCount = questions.filter(
    (q) => placementAnswers[q.id] === q.correctIndex
  ).length;
  const firstRec = getCourseRecommendation(
    firstSubjectId ?? "python",
    correctCount,
    questions.length
  );

  const totalLessons = selectedSubjectIds.reduce((sum, sid) => {
    const q = QUIZ_QUESTIONS[sid] ?? [];
    const correct = q.filter(
      (qq) => placementAnswers[qq.id] === qq.correctIndex
    ).length;
    const rec = getCourseRecommendation(sid, correct, q.length);
    return sum + rec.lessons;
  }, 0);

  return (
    <div className="flex flex-col items-center gap-6 text-center py-4">
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <GraduationCap className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">
            Welcome aboard, {name.split(" ")[0]}!
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your personalized learning journey starts now.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="rounded-lg border border-border bg-card p-3 flex flex-col items-center gap-1.5">
          <BarChart2 className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold">{selectedSubjectIds.length}</span>
          <span className="text-xs text-muted-foreground">Subjects</span>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 flex flex-col items-center gap-1.5">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold">{totalLessons}</span>
          <span className="text-xs text-muted-foreground">Lessons</span>
        </div>
        <div className="rounded-lg border border-border bg-card p-3 flex flex-col items-center gap-1.5">
          <Star className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold">0</span>
          <span className="text-xs text-muted-foreground">XP earned</span>
        </div>
      </div>

      <div className="w-full rounded-lg border border-primary/30 bg-primary/5 p-4 text-left">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Start here</span>
        </div>
        <p className="text-sm font-medium">{firstRec.firstLesson}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {firstRec.courseName} · {subject?.icon} {subject?.name}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span>Account created</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span>Placement assessment complete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span>Learning path personalized</span>
        </div>
      </div>

      <Button size="lg" onClick={onStartLearning} className="w-full mt-2">
        <Play className="mr-2 h-4 w-4" />
        Start first lesson
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function StudentOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  // Step 1 data
  const [signUpData, setSignUpData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });

  // Step 2 data
  const [placementState, setPlacementState] = useState<PlacementState>({
    selectedSubjectIds: [],
    answers: {},
    phase: "select",
    currentSubjectIndex: 0,
    currentQuestionIndex: 0,
  });

  // Step 3 data
  const [goalData, setGoalData] = useState<GoalData>({
    goalOptionId: "",
    customGoalText: {},
  });

  function goToStep(s: Step) {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const stepLabels = ["Sign Up", "Placement", "Goals", "Courses", "Welcome"];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AI School</span>
          </div>
          <StepIndicator current={step} total={5} />
          <p className="text-xs text-muted-foreground">{stepLabels[step - 1]}</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {step === 1 && (
            <StepSignUp
              data={signUpData}
              onChange={setSignUpData}
              onNext={() => goToStep(2)}
            />
          )}
          {step === 2 && (
            <StepPlacement
              state={placementState}
              onChange={setPlacementState}
              onNext={() => goToStep(3)}
              onBack={() => goToStep(1)}
            />
          )}
          {step === 3 && (
            <StepGoalSetting
              selectedSubjectIds={placementState.selectedSubjectIds}
              data={goalData}
              onChange={setGoalData}
              onNext={() => goToStep(4)}
              onBack={() => goToStep(2)}
            />
          )}
          {step === 4 && (
            <StepRecommendations
              selectedSubjectIds={placementState.selectedSubjectIds}
              placementAnswers={placementState.answers}
              onNext={() => goToStep(5)}
              onBack={() => goToStep(3)}
            />
          )}
          {step === 5 && (
            <StepWelcome
              name={signUpData.name}
              selectedSubjectIds={placementState.selectedSubjectIds}
              placementAnswers={placementState.answers}
              onStartLearning={() => navigate("/yoda")}
            />
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Powered by AI · Your progress is saved automatically
        </p>
      </div>
    </div>
  );
}
