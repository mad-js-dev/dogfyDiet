import type { QuestionConfig } from '~/types/questionnaire'

export const questionnaireQuestions: QuestionConfig[] = [
  {
    id: 'pet_race',
    type: 'select',
    question: 'What is your pet\'s race?',
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
  }
]
