import type { QuestionConfig } from '~/types/questionnaire'

export const questionnaireQuestions: QuestionConfig[] = [
  {
    id: 'pet_race',
    question: 'What is your pet\'s race?',
    type: 'select',
    required: true,
    options: [
      'Labrador Retriever',
      'German Shepherd',
      'Golden Retriever',
      'Bulldog',
      'Poodle',
      'Beagle',
      'Rottweiler',
      'Yorkshire Terrier',
      'Boxer',
      'Dachshund',
      'Siberian Husky',
      'Great Dane',
      'Other'
    ],
    appliesTo: 'all'
  },
  {
    id: 'pet_name',
    question: 'What is your pet\'s name?',
    type: 'text',
    required: true,
    appliesTo: 'individual'
  },
  {
    id: 'multiple_pets_same_gender',
    question: 'Do your pets have the same gender?',
    type: 'bool',
    required: true,
    appliesTo: 'all',
    dependencies: [
      {
        questionId: 'pet_count',
        operator: 'equals',
        value: 2,
        action: 'show'
      }
    ]
  },
  {
    id: 'multiple_pets_similar_weights',
    question: 'Do your pets have similar weights?',
    type: 'bool',
    required: true,
    appliesTo: 'all',
    dependencies: [
      {
        questionId: 'pet_count',
        operator: 'equals',
        value: 2,
        action: 'show'
      }
    ]
  },
  {
    id: 'multiple_pets_similar_activity',
    question: 'Do your pets have similar activity levels?',
    type: 'bool',
    required: true,
    appliesTo: 'all',
    dependencies: [
      {
        questionId: 'pet_count',
        operator: 'equals',
        value: 2,
        action: 'show'
      }
    ]
  },
  {
    id: 'pet_sex',
    question: 'What is your pet\'s sex?',
    type: 'select',
    required: true,
    options: ['Male', 'Female'],
    appliesTo: 'individual'
  },
  {
    id: 'pet_sterilized',
    question: 'Has your pet been sterilized?',
    type: 'bool',
    required: true,
    appliesTo: 'individual'
  },
  {
    id: 'pet_lactating',
    question: 'Is your pet currently lactating?',
    type: 'bool',
    required: true,
    appliesTo: 'individual',
    dependencies: [
      {
        questionId: 'pet_sex',
        operator: 'equals',
        value: 'Female',
        action: 'show'
      }
    ]
  },
  {
    id: 'pet_age',
    question: 'What is your pet\'s age?',
    type: 'age',
    required: true,
    appliesTo: 'individual',
    validation: [
      {
        type: 'required',
        message: 'Pet age is required'
      }
    ]
  },
  {
    id: 'pet_activity_level',
    question: 'What is your pet\'s activity level?',
    type: 'select',
    required: true,
    options: ['Calm', 'Regular', 'Active'],
    appliesTo: 'individual'
  },
  {
    id: 'pet_pathologies',
    question: 'Does your pet have any pathologies?',
    type: 'bool',
    required: true,
    appliesTo: 'individual'
  },
  {
    id: 'pet_pathology_list',
    question: 'Select all pathologies that apply to your pet:',
    type: 'select',
    required: true,
    options: [
      'Allergies',
      'Arthritis',
      'Diabetes',
      'Heart disease',
      'Kidney disease',
      'Liver disease',
      'Digestive issues',
      'Obesity',
      'Skin problems',
      'Dental problems',
      'Eye problems',
      'Ear infections',
      'Respiratory issues',
      'Thyroid problems',
      'Cancer',
      'Other'
    ],
    appliesTo: 'individual',
    dependencies: [
      {
        questionId: 'pet_pathologies',
        operator: 'equals',
        value: true,
        action: 'show'
      }
    ]
  },
  {
    id: 'pet_alimentary_activity',
    question: 'What is your pet\'s alimentary activity level?',
    type: 'select',
    required: true,
    options: ['Low', 'Regular', 'High'],
    appliesTo: 'individual'
  },
  {
    id: 'human_name',
    question: 'What is your name?',
    type: 'text',
    required: true,
    appliesTo: 'all'
  },
  {
    id: 'human_email',
    question: 'What is your email address?',
    type: 'text',
    required: true,
    appliesTo: 'all',
    validation: [
      {
        type: 'pattern',
        value: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        message: 'Please enter a valid email address'
      }
    ]
  },
  {
    id: 'human_phone',
    question: 'What is your phone number?',
    type: 'text',
    required: true,
    appliesTo: 'all',
    validation: [
      {
        type: 'pattern',
        value: '^[+]?[\\d\\s\\-\\(\\)]+$',
        message: 'Please enter a valid phone number'
      }
    ]
  }
]
