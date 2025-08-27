import { create } from 'zustand'
import { type SignupState, type UserType, type VerifyMethod } from '../types/auth.types'

interface SignupStore extends SignupState {
  setStep: (step: number) => void
  setUserType: (type: UserType) => void
  setVerifyMethod: (method: VerifyMethod) => void
  setTermsAgreed: (terms: Partial<SignupState['termsAgreed']>) => void
  setPersonalInfo: (info: Partial<SignupState['personalInfo']>) => void
  setAccountInfo: (info: Partial<SignupState['accountInfo']>) => void
  reset: () => void
  nextStep: () => void
  prevStep: () => void
}

const initialState: SignupState = {
  currentStep: 1,
  userType: null,
  verifyMethod: null,
  termsAgreed: {
    all: false,
    service: false,
    privacy: false,
    age: false,
    marketing: false,
    advertising: false,
  },
  personalInfo: {
    name: '',
    birthdate: '',
    phone: '',
  },
  accountInfo: {
    username: '',
    password: '',
    email: '',
    nickname: '',
  },
}

export const useSignupFlow = create<SignupStore>((set) => ({
  ...initialState,
  
  setStep: (step) => set({ currentStep: step }),
  
  setUserType: (type) => set({ userType: type }),
  
  setVerifyMethod: (method) => set({ verifyMethod: method }),
  
  setTermsAgreed: (terms) =>
    set((state) => ({
      termsAgreed: { ...state.termsAgreed, ...terms },
    })),
    
  setPersonalInfo: (info) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...info },
    })),
    
  setAccountInfo: (info) =>
    set((state) => ({
      accountInfo: { ...state.accountInfo, ...info },
    })),
    
  reset: () => set(initialState),
  
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
}))