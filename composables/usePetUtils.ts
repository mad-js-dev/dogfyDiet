export const usePetUtils = (questionnaire: any) => {
  const petDisplayName = (petNum: number) => {
    const petNameAnswer = questionnaire.getAnswer('pet_name', `pet_${petNum}`)
    return petNameAnswer ? petNameAnswer.value : `Pet ${petNum}`
  }

  const calculatePetAge = (petNum: number) => {
    const yearAnswer = questionnaire.getAnswer('pet_birth_year', `pet_${petNum}`)
    const monthAnswer = questionnaire.getAnswer('pet_birth_month', `pet_${petNum}`)
    
    if (!yearAnswer?.value || !monthAnswer?.value) return null
    
    const birthYear = parseInt(yearAnswer.value)
    const birthMonth = new Date(monthAnswer.value + ' 1').getMonth() + 1
    
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    
    let years = currentYear - birthYear
    let months = currentMonth - birthMonth
    
    if (months < 0) {
      years--
      months += 12
    }
    
    return { years, months }
  }

  const getAnswerValue = (questionId: string, petNum?: number) => {
    // For user-level questions (no pet), get answer without petId
    if (!petNum) {
      const answer = questionnaire.getAnswer(questionId)
      return answer ? answer.value : null
    }
    
    // For pet-specific questions, include petId in the search
    const answer = questionnaire.getAnswer(questionId, `pet_${petNum}`)
    return answer ? answer.value : null
  }

  return {
    petDisplayName,
    calculatePetAge,
    getAnswerValue
  }
}
