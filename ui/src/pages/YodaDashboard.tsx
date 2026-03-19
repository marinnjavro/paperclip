import { useEffect, useState } from "react";
import { useBreadcrumbs } from "../context/BreadcrumbContext";
import { MetricCard } from "../components/MetricCard";
import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  AlertTriangle,
  BarChart2,
  BookOpen,
  MessageSquare,
  StickyNote,
  Clock,
  CheckCircle2,
  ChevronRight,
  Zap,
  TrendingDown,
  Send,
  Eye,
  Timer,
  Target,
  HelpCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type StudentStatus = "on_track" | "needs_attention" | "blocked";

interface StuckPoint {
  topic: string;
  attempts: number;
  lastSeen: string;
}

interface TranscriptMessage {
  id: string;
  role: "student" | "ai_tutor";
  content: string;
  timestamp: string;
}

interface MentorNote {
  id: string;
  content: string;
  addedAt: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  status: StudentStatus;
  courseName: string;
  lessonsCompleted: number;
  totalLessons: number;
  quizScore: number; // 0-100
  timeSpentMinutes: number;
  lastActive: string;
  stuckPoints: StuckPoint[];
  transcript: TranscriptMessage[];
  mentorNotes: MentorNote[];
  alertReason?: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Amara Osei",
    avatar: "AO",
    status: "blocked",
    courseName: "Python for Data Science",
    lessonsCompleted: 8,
    totalLessons: 24,
    quizScore: 41,
    timeSpentMinutes: 340,
    lastActive: "2 hours ago",
    alertReason: "Stuck on list comprehensions for 3 sessions. Quiz score dropped 22 pts.",
    stuckPoints: [
      { topic: "List comprehensions", attempts: 7, lastSeen: "Today" },
      { topic: "Lambda functions", attempts: 4, lastSeen: "Yesterday" },
    ],
    transcript: [
      { id: "t1", role: "student", content: "I still don't understand why [x for x in range(10)] works differently than a regular for loop", timestamp: "10:42 AM" },
      { id: "t2", role: "ai_tutor", content: "Great question! Let's break this down step by step. A list comprehension is essentially a compact way to write a for loop that builds a list. Think of it as shorthand — [expression for item in iterable]. Can you tell me what you'd expect `[x*2 for x in range(5)]` to produce?", timestamp: "10:42 AM" },
      { id: "t3", role: "student", content: "I think... 0, 2, 4, 6, 8? But I'm not sure", timestamp: "10:45 AM" },
      { id: "t4", role: "ai_tutor", content: "Exactly right! You've got the core concept. The expression `x*2` runs for each value x as we iterate through range(5). What's confusing you is probably the syntax rather than the logic. Let's practice with a few examples.", timestamp: "10:45 AM" },
      { id: "t5", role: "student", content: "Ok but when there's an if statement inside I get completely lost", timestamp: "10:48 AM" },
    ],
    mentorNotes: [],
  },
  {
    id: "s2",
    name: "Luka Petrović",
    avatar: "LP",
    status: "needs_attention",
    courseName: "Python for Data Science",
    lessonsCompleted: 14,
    totalLessons: 24,
    quizScore: 63,
    timeSpentMinutes: 520,
    lastActive: "5 hours ago",
    alertReason: "Engagement dropped — only 12 min logged in last 3 days.",
    stuckPoints: [
      { topic: "Pandas DataFrames", attempts: 3, lastSeen: "3 days ago" },
    ],
    transcript: [
      { id: "t1", role: "student", content: "Can we just skip the DataFrames section? I already know Excel", timestamp: "Yesterday 3:12 PM" },
      { id: "t2", role: "ai_tutor", content: "I hear you — if you know Excel, DataFrames will click fast. They're like spreadsheets you can program. Let's connect what you already know: a DataFrame column is like an Excel column, but you can filter it in one line of code. Want to see a quick example?", timestamp: "Yesterday 3:12 PM" },
      { id: "t3", role: "student", content: "Sure I guess", timestamp: "Yesterday 3:14 PM" },
    ],
    mentorNotes: [
      { id: "n1", content: "Student seems disengaged. Background is Excel-heavy finance. Try framing all examples as financial analysis use cases.", addedAt: "2 days ago" },
    ],
  },
  {
    id: "s3",
    name: "Priya Sharma",
    avatar: "PS",
    status: "on_track",
    courseName: "Python for Data Science",
    lessonsCompleted: 19,
    totalLessons: 24,
    quizScore: 88,
    timeSpentMinutes: 780,
    lastActive: "1 hour ago",
    stuckPoints: [],
    transcript: [
      { id: "t1", role: "student", content: "I finished the matplotlib section! Can I jump ahead to seaborn?", timestamp: "1:30 PM" },
      { id: "t2", role: "ai_tutor", content: "Absolutely! You've mastered the matplotlib fundamentals well above benchmark. Seaborn builds directly on matplotlib but with a much cleaner API for statistical visualizations. Let's start with your first seaborn plot.", timestamp: "1:30 PM" },
      { id: "t3", role: "student", content: "This is so much cleaner than matplotlib 😊", timestamp: "1:45 PM" },
    ],
    mentorNotes: [],
  },
  {
    id: "s4",
    name: "Tobias Weber",
    avatar: "TW",
    status: "on_track",
    courseName: "SQL Fundamentals",
    lessonsCompleted: 6,
    totalLessons: 18,
    quizScore: 79,
    timeSpentMinutes: 210,
    lastActive: "3 hours ago",
    stuckPoints: [
      { topic: "JOINs (OUTER vs INNER)", attempts: 2, lastSeen: "Today" },
    ],
    transcript: [
      { id: "t1", role: "student", content: "When would I use a LEFT JOIN vs an INNER JOIN?", timestamp: "11:20 AM" },
      { id: "t2", role: "ai_tutor", content: "Good question — this trips up a lot of learners. INNER JOIN returns only rows where there's a match in BOTH tables. LEFT JOIN returns ALL rows from the left table, even if there's no match on the right (those become NULL). Imagine customers and orders: an INNER JOIN would exclude customers with no orders, but a LEFT JOIN would show all customers.", timestamp: "11:20 AM" },
    ],
    mentorNotes: [],
  },
  {
    id: "s5",
    name: "Chiara Romano",
    avatar: "CR",
    status: "blocked",
    courseName: "Machine Learning Basics",
    lessonsCompleted: 3,
    totalLessons: 20,
    quizScore: 29,
    timeSpentMinutes: 190,
    lastActive: "1 day ago",
    alertReason: "Quiz score 29/100 after 3 attempts. Prerequisite gap suspected (linear algebra).",
    stuckPoints: [
      { topic: "Matrix multiplication", attempts: 9, lastSeen: "Yesterday" },
      { topic: "Gradient descent intuition", attempts: 5, lastSeen: "2 days ago" },
    ],
    transcript: [
      { id: "t1", role: "student", content: "I don't understand any of this. The math makes no sense to me", timestamp: "Yesterday 4:00 PM" },
      { id: "t2", role: "ai_tutor", content: "I can see this is frustrating, and that's completely valid. Let me check something — are you comfortable with basic algebra and what a function is? Sometimes the ML course assumes background that not everyone has. No judgment at all, I just want to start at the right place for you.", timestamp: "Yesterday 4:00 PM" },
      { id: "t3", role: "student", content: "I know basic algebra I think but I never studied linear algebra", timestamp: "Yesterday 4:02 PM" },
      { id: "t4", role: "ai_tutor", content: "That explains it — and it's a very common gap. Linear algebra is the language ML is written in. I'm going to suggest a short 2-hour linear algebra primer before we continue. It will make everything else click.", timestamp: "Yesterday 4:02 PM" },
    ],
    mentorNotes: [],
  },
  {
    id: "s6",
    name: "Felix Andersen",
    avatar: "FA",
    status: "on_track",
    courseName: "SQL Fundamentals",
    lessonsCompleted: 15,
    totalLessons: 18,
    quizScore: 91,
    timeSpentMinutes: 420,
    lastActive: "30 min ago",
    stuckPoints: [],
    transcript: [
      { id: "t1", role: "student", content: "I think I'm ready for the final project. What does it look like?", timestamp: "Today 9:15 AM" },
      { id: "t2", role: "ai_tutor", content: "You're ahead of schedule and your quiz scores confirm it. The final project is a real-world dataset analysis: you'll get a raw e-commerce DB and need to answer 10 business questions using SQL. It's very doable at your level. Want a sneak peek at the questions?", timestamp: "Today 9:15 AM" },
    ],
    mentorNotes: [
      { id: "n1", content: "High performer. Consider recommending advanced SQL course upon completion.", addedAt: "1 week ago" },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusColor(status: StudentStatus) {
  switch (status) {
    case "blocked": return "text-red-500";
    case "needs_attention": return "text-amber-500";
    case "on_track": return "text-emerald-500";
  }
}

function statusDotClass(status: StudentStatus) {
  switch (status) {
    case "blocked": return "bg-red-500";
    case "needs_attention": return "bg-amber-400 animate-pulse";
    case "on_track": return "bg-emerald-500";
  }
}

function statusLabel(status: StudentStatus) {
  switch (status) {
    case "blocked": return "Blocked";
    case "needs_attention": return "Attention";
    case "on_track": return "On Track";
  }
}

function progressColor(pct: number) {
  if (pct >= 75) return "bg-emerald-500";
  if (pct >= 40) return "bg-blue-400";
  return "bg-amber-400";
}

function scoreColor(score: number) {
  if (score >= 75) return "text-emerald-400";
  if (score >= 55) return "text-amber-400";
  return "text-red-400";
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StudentAvatar({ initials, status }: { initials: string; status: StudentStatus }) {
  return (
    <div className="relative shrink-0">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
        {initials}
      </div>
      <div className={cn("absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background", statusDotClass(status))} />
    </div>
  );
}

function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("w-full h-1.5 bg-muted rounded-full overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all", progressColor(value))}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

function AlertBanner({ students }: { students: Student[] }) {
  const alerts = students.filter((s) => s.status === "blocked" || s.status === "needs_attention");
  if (alerts.length === 0) return null;

  return (
    <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
          AI Alerts — {alerts.length} student{alerts.length !== 1 ? "s" : ""} need attention
        </span>
      </div>
      <div className="space-y-1.5">
        {alerts.map((s) => (
          <div key={s.id} className="flex items-start gap-2">
            <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", statusDotClass(s.status))} />
            <div className="min-w-0">
              <span className="text-xs font-medium text-foreground">{s.name}</span>
              {s.alertReason && (
                <p className="text-xs text-muted-foreground truncate">{s.alertReason}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptView({ messages }: { messages: TranscriptMessage[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
        <p className="text-xs text-muted-foreground">No transcript available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            "flex gap-2.5",
            msg.role === "student" ? "flex-row" : "flex-row-reverse"
          )}
        >
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
            msg.role === "student"
              ? "bg-muted text-foreground"
              : "bg-primary/10 text-primary"
          )}>
            {msg.role === "student" ? "S" : "AI"}
          </div>
          <div className={cn(
            "flex-1 max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed",
            msg.role === "student"
              ? "bg-muted text-foreground"
              : "bg-accent/50 text-foreground border border-border"
          )}>
            <p>{msg.content}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{msg.timestamp}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-1.5 pt-1 pb-2 text-[10px] text-muted-foreground border-t border-border">
        <Eye className="h-3 w-3" />
        <span>Read-only view — full session log</span>
      </div>
    </div>
  );
}

function NotesPanel({
  notes,
  onAddNote,
}: {
  notes: MentorNote[];
  onAddNote: (text: string) => void;
}) {
  const [draft, setDraft] = useState("");

  function handleSubmit() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAddNote(trimmed);
    setDraft("");
  }

  return (
    <div className="space-y-4">
      {/* Add note */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Add guidance note</p>
        <Textarea
          placeholder="Add context or guidance for the AI tutor (e.g. 'Student is a visual learner — use diagrams')..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="text-xs resize-none min-h-[80px]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!draft.trim()}
          className="w-full"
        >
          <Send className="h-3.5 w-3.5 mr-1.5" />
          Send to AI Tutor
        </Button>
      </div>

      {/* Existing notes */}
      {notes.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Previous Notes
          </p>
          {notes.map((note) => (
            <div key={note.id} className="rounded-md border border-border bg-muted/30 p-3 space-y-1">
              <p className="text-xs text-foreground leading-relaxed">{note.content}</p>
              <p className="text-[10px] text-muted-foreground">{note.addedAt}</p>
            </div>
          ))}
        </div>
      )}

      {notes.length === 0 && (
        <div className="text-center py-4">
          <StickyNote className="h-6 w-6 text-muted-foreground/30 mx-auto mb-1.5" />
          <p className="text-xs text-muted-foreground">No notes yet</p>
        </div>
      )}
    </div>
  );
}

function StudentDetail({
  student,
  onAddNote,
}: {
  student: Student;
  onAddNote: (studentId: string, text: string) => void;
}) {
  const progressPct = Math.round((student.lessonsCompleted / student.totalLessons) * 100);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border shrink-0">
        <div className="flex items-start gap-3">
          <StudentAvatar initials={student.avatar} status={student.status} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground">{student.name}</h2>
              <span className={cn("text-xs font-medium", statusColor(student.status))}>
                {statusLabel(student.status)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{student.courseName}</p>
          </div>
        </div>

        {/* Alert */}
        {student.alertReason && (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/5 px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300 leading-relaxed">{student.alertReason}</p>
          </div>
        )}

        {/* Quick stats */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          <div className="text-center">
            <p className="text-sm font-bold tabular-nums">{progressPct}%</p>
            <p className="text-[10px] text-muted-foreground">Done</p>
          </div>
          <div className="text-center">
            <p className={cn("text-sm font-bold tabular-nums", scoreColor(student.quizScore))}>
              {student.quizScore}
            </p>
            <p className="text-[10px] text-muted-foreground">Score</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold tabular-nums">{formatTime(student.timeSpentMinutes)}</p>
            <p className="text-[10px] text-muted-foreground">Time</p>
          </div>
          <div className="text-center">
            <p className={cn("text-sm font-bold tabular-nums", student.stuckPoints.length > 0 ? "text-amber-400" : "text-emerald-400")}>
              {student.stuckPoints.length}
            </p>
            <p className="text-[10px] text-muted-foreground">Stuck</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              {student.lessonsCompleted} / {student.totalLessons} lessons
            </span>
            <span className="text-[10px] text-muted-foreground">Last active: {student.lastActive}</span>
          </div>
          <ProgressBar value={progressPct} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-3 shrink-0 w-auto justify-start gap-1 bg-transparent p-0 border-b border-border rounded-none">
            <TabsTrigger value="overview" className="text-xs pb-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transcript" className="text-xs pb-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none">
              Transcript
            </TabsTrigger>
            <TabsTrigger value="notes" className="text-xs pb-2 px-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent shadow-none">
              Notes
              {student.mentorNotes.length > 0 && (
                <span className="ml-1.5 bg-primary text-primary-foreground text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  {student.mentorNotes.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <TabsContent value="overview" className="px-4 py-3 space-y-4 mt-0">
              {/* Stuck points */}
              {student.stuckPoints.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <HelpCircle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <span className="text-xs font-semibold text-foreground">Stuck Points</span>
                  </div>
                  <div className="space-y-2">
                    {student.stuckPoints.map((sp) => (
                      <div key={sp.topic} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                        <div>
                          <p className="text-xs font-medium text-foreground">{sp.topic}</p>
                          <p className="text-[10px] text-muted-foreground">Last seen: {sp.lastSeen}</p>
                        </div>
                        <Badge variant="outline" className={cn(
                          "text-[10px] font-mono",
                          sp.attempts >= 6 ? "border-red-500/50 text-red-400" : "border-amber-500/50 text-amber-400"
                        )}>
                          {sp.attempts}× tried
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {student.stuckPoints.length === 0 && (
                <div className="flex items-center gap-2 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <p className="text-xs text-muted-foreground">No stuck points — student is progressing well</p>
                </div>
              )}

              {/* Lesson progress */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-xs font-semibold text-foreground">Lesson Progress</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium tabular-nums">{student.lessonsCompleted} of {student.totalLessons}</span>
                  </div>
                  <ProgressBar value={progressPct} />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Quiz avg</span>
                    <span className={cn("font-medium tabular-nums", scoreColor(student.quizScore))}>{student.quizScore}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Time invested</span>
                    <span className="font-medium tabular-nums">{formatTime(student.timeSpentMinutes)}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transcript" className="px-4 py-3 mt-0">
              <TranscriptView messages={student.transcript} />
            </TabsContent>

            <TabsContent value="notes" className="px-4 py-3 mt-0">
              <NotesPanel
                notes={student.mentorNotes}
                onAddNote={(text) => onAddNote(student.id, text)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function YodaDashboard() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_STUDENTS[0]?.id ?? null);

  useEffect(() => {
    setBreadcrumbs([{ label: "Yoda Dashboard" }]);
  }, [setBreadcrumbs]);

  const selected = students.find((s) => s.id === selectedId) ?? null;
  const alerts = students.filter((s) => s.status === "blocked" || s.status === "needs_attention");
  const avgScore = Math.round(students.reduce((sum, s) => sum + s.quizScore, 0) / students.length);
  const avgProgress = Math.round(
    students.reduce((s, st) => s + (st.lessonsCompleted / st.totalLessons) * 100, 0) / students.length
  );

  function handleAddNote(studentId: string, text: string) {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              mentorNotes: [
                ...s.mentorNotes,
                { id: `n-${Date.now()}`, content: text, addedAt: "Just now" },
              ],
            }
          : s
      )
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 -mx-4 -mt-4 overflow-hidden">
      {/* Page header */}
      <div className="px-5 pt-4 pb-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Yoda Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Mentor oversight · {students.length} students · {alerts.length} need attention
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-md px-2.5 py-1.5">
            <Timer className="h-3.5 w-3.5" />
            Live
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2">
          <div className="border border-border rounded-lg bg-card">
            <MetricCard
              icon={GraduationCap}
              value={students.length}
              label="Students"
              description={`${students.filter((s) => s.status === "on_track").length} on track`}
            />
          </div>
          <div className="border border-border rounded-lg bg-card">
            <MetricCard
              icon={AlertTriangle}
              value={alerts.length}
              label="Alerts"
              description={`${students.filter((s) => s.status === "blocked").length} blocked`}
            />
          </div>
          <div className="border border-border rounded-lg bg-card">
            <MetricCard
              icon={BarChart2}
              value={`${avgScore}%`}
              label="Avg Quiz Score"
              description={avgScore >= 70 ? "Above benchmark" : "Below benchmark"}
            />
          </div>
          <div className="border border-border rounded-lg bg-card">
            <MetricCard
              icon={Target}
              value={`${avgProgress}%`}
              label="Avg Completion"
              description="Across all cohorts"
            />
          </div>
        </div>
      </div>

      {/* Body: student list + detail */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left: student list */}
        <div className="w-72 border-r border-border flex flex-col shrink-0 min-h-0">
          <div className="px-3 py-3 space-y-3 flex-1 min-h-0 overflow-y-auto">
            {/* Alerts section */}
            {alerts.length > 0 && (
              <AlertBanner students={students} />
            )}

            {/* All students */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1 mb-1.5">
                All Students
              </p>
              <div className="space-y-0.5">
                {students.map((s) => {
                  const pct = Math.round((s.lessonsCompleted / s.totalLessons) * 100);
                  const isSelected = s.id === selectedId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={cn(
                        "w-full text-left px-2.5 py-2.5 rounded-md transition-colors group",
                        isSelected ? "bg-accent" : "hover:bg-accent/50"
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <StudentAvatar initials={s.avatar} status={s.status} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-medium text-foreground truncate">{s.name}</span>
                            <ChevronRight className={cn(
                              "h-3 w-3 text-muted-foreground shrink-0 transition-opacity",
                              isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                            )} />
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate">{s.courseName}</p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <ProgressBar value={pct} className="flex-1 h-1" />
                            <span className={cn("text-[10px] font-mono shrink-0", scoreColor(s.quizScore))}>
                              {s.quizScore}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: detail panel */}
        <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
          {selected ? (
            <StudentDetail
              student={selected}
              onAddNote={handleAddNote}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <GraduationCap className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Select a student to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
