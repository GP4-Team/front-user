// src/data/mockWeaknessData.js
/**
 * Mock data for AI Weakness Portal
 * Used when backend APIs are not available
 */

export const mockWeaknessData = {
  student_id: 45,
  weaknesses: [
    {
      course_idea_id: "math_basic",
      average_score: 38.47,
      attempts: 38,
      recommendation: "Focus on additional practice in basic arithmetic and algebra"
    }
  ],
  recommendations: [],
  overall_score: 38,
  last_analysis: "2025-06-08T16:18:41.561376Z",
  improvement_areas: [
    "Basic Arithmetic Operations",
    "Linear Equations",
    "Algebra Fundamentals"
  ]
};

export const mockRecommendations = [
  {
    recommendation_id: "qr-5e5a65b7fdb8",
    course_id: "1",
    created_at: "2025-06-07T20:52:55.953883",
    num_questions: 2,
    primary_purpose: "reinforcement",
    course_name: "الرياضيات الأساسية"
  },
  {
    recommendation_id: "qr-9896c8977021",
    course_id: "2", 
    created_at: "2025-06-04T16:13:12.029359",
    num_questions: 5,
    primary_purpose: "practice",
    course_name: "الجبر والمعادلات"
  },
  {
    recommendation_id: "qr-abc123def456",
    course_id: "3",
    created_at: "2025-06-03T14:30:15.123456",
    num_questions: 8,
    primary_purpose: "assessment", 
    course_name: "الهندسة الأساسية"
  }
];

export const mockRecommendationDetails = {
  "qr-5e5a65b7fdb8": {
    recommendation_id: "qr-5e5a65b7fdb8",
    explanation: "Balanced selection to reinforce current knowledge level. Mix of difficulties to maintain engagement and confidence.",
    reasoning_details: {
      personalization_factors: [
        "Questions selected based on your individual performance history",
        "Difficulty levels adjusted to your current skill level", 
        "Content areas chosen to address your specific learning needs"
      ],
      difficulty_rationale: "Easy questions for confidence building. Medium questions for skill development.",
      topic_selection_logic: [
        "Balanced selection to reinforce current knowledge level",
        "Mix of difficulties to maintain engagement and confidence"
      ],
      ai_confidence_level: "medium"
    },
    learning_objectives: [
      "Reinforce key concepts and skills",
      "Maintain knowledge retention",
      "Build fluency and confidence"
    ],
    expected_outcomes: [
      "Improved understanding of basic concepts",
      "Better retention of mathematical principles", 
      "Increased confidence in problem solving"
    ],
    time_management: [
      "Total estimated time: 4 minutes",
      "Average 2 minutes per question",
      "Time estimates based on question difficulty and your performance history"
    ]
  },
  "qr-9896c8977021": {
    recommendation_id: "qr-9896c8977021",
    explanation: "Practice-focused quiz to strengthen algebra skills and equation solving techniques.",
    reasoning_details: {
      personalization_factors: [
        "Targets your weakest algebra concepts",
        "Progressive difficulty to build confidence",
        "Focuses on problem-solving strategies"
      ],
      difficulty_rationale: "Gradual increase from basic to intermediate algebra problems.",
      topic_selection_logic: [
        "Emphasis on linear equations and basic algebra",
        "Real-world application problems included"
      ],
      ai_confidence_level: "high"
    },
    learning_objectives: [
      "Master linear equation solving",
      "Understand algebraic manipulation",
      "Apply algebra to real-world problems"
    ],
    expected_outcomes: [
      "Improved algebraic problem-solving skills",
      "Better understanding of equation structures",
      "Increased speed in calculations"
    ],
    time_management: [
      "Total estimated time: 10 minutes", 
      "Average 2 minutes per question",
      "Additional time for complex problems"
    ]
  }
};

export const mockPortalData = {
  success: true,
  weakness: mockWeaknessData,
  recommendations: mockRecommendations,
  meta: {
    weakness: {
      generated_at: "2025-06-08T16:18:41.561376Z",
      language: "ar",
      portal_optimized: true
    },
    recommendations: {
      generated_at: "2025-06-08T16:18:01.597199Z", 
      language: "ar",
      portal_optimized: true
    }
  },
  errors: []
};
