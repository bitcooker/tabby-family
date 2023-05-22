import type {
  Announcement,
  Role,
  Manager,
  Location,
  Office,
  Pronoun,
  Employee,
} from '@prisma/client'
import { faker } from '@faker-js/faker'
import { loremIpsum } from 'lorem-ipsum'

function createAnnouncement(): Announcement {
  return {
    id: faker.string.uuid(),
    title: faker.animal.dog(),
    content: loremIpsum({
      count: 3,
    }),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createManager(): Manager {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createLocation(): Location {
  return {
    id: faker.string.uuid(),
    name: faker.location.state(),
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

function createOffices(): Office[] {
  const offices: Office[] = []

  locations.forEach((element) => {
    offices.push({
      id: faker.string.uuid(),
      name:
        locations.find((location) => location.id === element.id)?.name + ' HQ',
      locationId: element.id,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    })
  })

  return offices
}

function createEmployee(): Employee {
  const roleIndex = faker.number.int(9)
  const managerIndex = faker.number.int(4)
  const officeIndex = faker.number.int(9)
  const pronounIndex = faker.number.int(2)

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    dob: faker.date.birthdate(),
    slack: faker.string.alpha({ length: { min: 3, max: 10 } }),
    twitter: faker.string.alpha({ length: { min: 3, max: 10 } }),
    avatar: faker.internet.avatar(),
    joined_at: faker.date.anytime(),
    bio: loremIpsum({
      count: 5,
    }),
    roleId: roles[roleIndex].id,
    managerId: managers[managerIndex].id,
    officeId: offices[officeIndex].id,
    pronounId: pronouns[pronounIndex].id,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }
}

export const roles: Role[] = [
  {
    id: faker.string.uuid(),
    role_name: 'Frontend Engineer',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Backend Engineer',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Full Stack Engineer',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Researcher',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Recruiter',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Product Manager',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Frontend Leader',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Backend Leader',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Chief Technical Officer',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    role_name: 'Chief Executive Officer',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
]

export const pronouns: Pronoun[] = [
  {
    id: faker.string.uuid(),
    name: 'He/Him',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    name: 'She/Her',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id: faker.string.uuid(),
    name: 'They/Them',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
]

export const announcements: Announcement[] = faker.helpers.multiple(
  createAnnouncement,
  { count: 10 }
)

export const managers: Manager[] = faker.helpers.multiple(createManager, {
  count: 5,
})

export const locations: Location[] = faker.helpers.multiple(createLocation, {
  count: 10,
})

export const offices: Office[] = createOffices()

export const employees: Employee[] = faker.helpers.multiple(createEmployee, {
  count: 50,
})
