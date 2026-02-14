import type { QuestionConfig } from '~/types/questionnaire'

export const questionnaireQuestions: QuestionConfig[] = [
  {
    id: 'pet_breed',
    type: 'select',
    question: 'What is your pet\'s breed?',
    appliesTo: 'all',
    required: true,
    options: [
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
  },
  {
    id: 'pet_name',
    type: 'text',
    question: 'What is your pet\'s name?',
    appliesTo: 'individual',
    required: true,
    validation: [
      {
        type: 'required',
        message: 'Pet name is required'
      },
      {
        type: 'minLength',
        value: 2,
        message: 'Pet name must be at least 2 characters'
      }
    ]
  },
  {
    id: 'pet_gender',
    type: 'select',
    question: 'What is your pet\'s gender?',
    appliesTo: 'individual',
    required: true,
    options: ['Male', 'Female'],
    validation: [
      {
        type: 'required',
        message: 'Pet gender is required'
      }
    ]
  },
  {
    id: 'pet_neutered',
    type: 'select',
    question: 'Is {petName} neutered/spayed?',
    appliesTo: 'individual',
    required: true,
    options: ['Yes', 'No'],
    validation: [
      {
        type: 'required',
        message: 'Neutered status is required'
      }
    ]
  },
  {
    id: 'pet_expecting',
    type: 'select',
    question: 'Is {petName} expecting?',
    appliesTo: 'individual',
    required: true,
    options: ['Yes', 'No'],
    validation: [
      {
        type: 'required',
        message: 'Expecting status is required'
      }
    ],
    dependencies: [
      {
        questionId: 'pet_gender',
        operator: 'equals',
        value: 'Female',
        action: 'show'
      },
      {
        questionId: 'pet_neutered',
        operator: 'equals',
        value: 'No',
        action: 'show'
      }
    ]
  },
  {
    id: 'pet_birth_year',
    type: 'select',
    question: 'What year was {petName} born?',
    appliesTo: 'individual',
    required: true,
    options: (() => {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let year = currentYear; year >= currentYear - 20; year--) {
        years.push(year.toString())
      }
      return years
    })(),
    validation: [
      {
        type: 'required',
        message: 'Birth year is required'
      }
    ]
  },
  {
    id: 'pet_birth_month',
    type: 'select',
    question: 'What month was {petName} born?',
    appliesTo: 'individual',
    required: true,
    options: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    validation: [
      {
        type: 'required',
        message: 'Birth month is required'
      }
    ]
  }
]
