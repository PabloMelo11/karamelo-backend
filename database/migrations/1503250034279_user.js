/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table
        .string('name')
        .unique()
        .notNullable();
      table.string('avatar');
      table.string('email').unique();
      table.string('password').notNullable();
      table.enu('status', ['active', 'inactive']);
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
