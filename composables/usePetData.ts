import { computed } from 'vue'

export const usePetData = () => {
  const allBreeds = [
    // Dog Breeds
    'Labrador Retriever',
    'German Shepherd', 
    'Golden Retriever',
    'French Bulldog',
    'Bulldog',
    'Poodle',
    'Beagle',
    'Rottweiler',
    'German Shorthaired Pointer',
    'Yorkshire Terrier',
    'Dachshund',
    'Siberian Husky',
    'Great Dane',
    'Boxer',
    'Chihuahua',
    // Cat Breeds
    'Persian',
    'Maine Coon',
    'British Shorthair',
    'Siamese',
    'American Shorthair',
    'Ragdoll',
    'Bengal',
    'Russian Blue',
    'Scottish Fold',
    'Birman',
    'Oriental Shorthair',
    'Devon Rex',
    'Himalayan',
    'American Curl',
    'Selkirk Rex'
  ]

  const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= currentYear - 20; year--) {
      years.push(year.toString())
    }
    return years
  })

  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return {
    allBreeds,
    yearOptions,
    monthOptions
  }
}
