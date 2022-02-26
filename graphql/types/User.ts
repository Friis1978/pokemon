import { enumType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.field('role', { type: Role })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
})