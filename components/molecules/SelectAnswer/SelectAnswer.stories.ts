import type { Meta, StoryObj } from '@storybook/vue3'

import SelectAnswer from './SelectAnswer.vue'

const meta: Meta<typeof SelectAnswer> = {
  title: 'Molecules/SelectAnswer',
  component: SelectAnswer,
  parameters: {
    layout: 'centered',
  },
  tags: ['molecules', 'select', 'search'],
}

export default meta
type Story = StoryObj<typeof SelectAnswer>

export const Default: Story = {
  args: {
    modelValue: '',
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select an option',
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'Option 2',
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Select an option',
  },
}

export const Searchable: Story = {
  args: {
    modelValue: '',
    options: [
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
    ],
    placeholder: 'Select breed',
    searchable: true,
    searchPlaceholder: 'Search breeds...',
  },
}

export const Required: Story = {
  args: {
    modelValue: '',
    options: ['Male', 'Female'],
    placeholder: 'Select gender',
    required: true,
  },
}

export const ManyOptionsWithSearch: Story = {
  args: {
    modelValue: '',
    options: [
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
      'Pembroke Welsh Corgi',
      'Australian Shepherd',
      'Doberman Pinscher',
      'Cavalier King Charles Spaniel',
      'Shih Tzu',
      'Boston Terrier',
      'Pomeranian',
      'Havanese',
      'Shetland Sheepdog',
      'Brittany',
      'Cocker Spaniel',
      'English Springer Spaniel',
      'Border Collie',
      'Bichon Frise',
      'West Highland White Terrier',
      'Basset Hound',
      'Mastiff',
      'Bernese Mountain Dog',
      'Cairn Terrier',
      'Scottish Terrier',
      'Papillon',
      'Bull Terrier',
      'Chihuahua',
      'Maltese',
      'Pekingese',
      'Miniature Schnauzer',
      'Chinese Shar-Pei',
      'Bouviers des Flandres',
      'Bloodhound',
      'Brussels Griffon',
      'Dandie Dinmont Terrier',
      'Lhasa Apso',
      'Lowchen',
      'Norfolk Terrier',
      'Norwich Terrier',
      'Puli',
      'Sealyham Terrier',
      'Skye Terrier',
      'Soft Coated Wheaten Terrier',
      'Vizsla',
      'Wirehaired Pointing Griffon',
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
    ],
    placeholder: 'Select breed',
    searchable: true,
    searchPlaceholder: 'Search dog and cat breeds...',
  },
}
