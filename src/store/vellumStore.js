import { create } from 'zustand';

const useVellumStore = create((set, get) => ({
  // Theme
  theme: 'dark',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  
  // Auth
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    // Dummy auth - always succeeds
    set({ 
      isAuthenticated: true, 
      user: { email, name: email.split('@')[0] } 
    });
    return true;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
  
  // Decisions
  decisions: [],
  addDecision: (decision) => set((state) => ({
    decisions: [{
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      hash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      committed: false,
      ...decision
    }, ...state.decisions]
  })),
  
  updateDecision: (id, updates) => set((state) => ({
    decisions: state.decisions.map(d => 
      d.id === id ? { ...d, ...updates } : d
    )
  })),
  
  commitDecision: (id) => set((state) => ({
    decisions: state.decisions.map(d => 
      d.id === id ? { ...d, committed: true, commitTimestamp: new Date().toISOString() } : d
    )
  })),
  
  // Current Decision in Progress
  currentDecision: null,
  setCurrentDecision: (decision) => set({ currentDecision: decision }),
  clearCurrentDecision: () => set({ currentDecision: null }),
  
  // Scribbles
  scribbles: [],
  addScribble: (scribble) => set((state) => ({
    scribbles: [...state.scribbles, {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...scribble
    }]
  })),
  
  updateScribble: (id, updates) => set((state) => ({
    scribbles: state.scribbles.map(s => 
      s.id === id ? { ...s, ...updates } : s
    )
  })),
  
  deleteScribble: (id) => set((state) => ({
    scribbles: state.scribbles.filter(s => s.id !== id)
  })),
  
  // UI State
  isDecisionModalOpen: false,
  openDecisionModal: () => set({ isDecisionModalOpen: true }),
  closeDecisionModal: () => set({ isDecisionModalOpen: false }),
  
  isAIPanelOpen: false,
  openAIPanel: () => set({ isAIPanelOpen: true }),
  closeAIPanel: () => set({ isAIPanelOpen: false }),
  
  // AI Analysis (simulated)
  aiAnalysis: null,
  generateAIAnalysis: (decision) => {
    // Simulate AI analysis
    const analysis = {
      reasoningArchitect: {
        title: "Reasoning Structure Analysis",
        insights: [
          "Your reasoning follows a clear cause-effect pattern",
          "Consider exploring second-order consequences",
          "Time horizon appears to be medium-term (6-12 months)"
        ],
        confidence: 0.85
      },
      biasAuditor: {
        title: "Cognitive Bias Detection",
        detectedBiases: [
          { name: "Confirmation Bias", probability: 0.42, description: "Tendency to favor information supporting existing beliefs" },
          { name: "Status Quo Bias", probability: 0.31, description: "Preference for current state over change" }
        ],
        overallRisk: "Moderate"
      },
      regretForecaster: {
        title: "Regret Probability Analysis",
        shortTerm: { probability: 0.23, factors: ["Immediate opportunity cost", "Social pressure"] },
        longTerm: { probability: 0.67, factors: ["Alignment with core values", "Career trajectory impact"] },
        recommendation: "Consider long-term implications more deeply"
      },
      missedVariables: {
        title: "Missed Variable Synthesis",
        variables: [
          "Economic climate shifts in next 6 months",
          "Alternative option C not considered",
          "Emotional/psychological impact on relationships",
          "Reversibility of this decision"
        ]
      }
    };
    
    set({ aiAnalysis: analysis });
  },
  
  clearAIAnalysis: () => set({ aiAnalysis: null })
}));

export default useVellumStore;
