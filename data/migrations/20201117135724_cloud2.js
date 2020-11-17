
exports.up = function (knex) {
    return knex.schema
      .createTable("classes", (tbl) => {
        tbl.increments();
        tbl.boolean("completed").defaultTo(false);
        tbl.string("subject", 50).notNull();
  
        tbl
          .integer("morning")
          .unsigned()
          .references("id")
          .inTable("volunteer")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
  
        tbl
          .integer("afternoon")
          .unsigned()
          .references("id")
          .inTable("volunteer")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
  
        tbl
          .integer("evening")
          .unsigned()
          .references("id")
          .inTable("volunteer")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  
      .createTable("volunteer", (tbl) => {
        tbl.increments();
        tbl.string("username", 120).notNullable().unique();
        tbl.string("password", 120).notNullable();
        tbl.string("email", 120).notNullable().unique();
      })
  
      .createTable("student", (tbl) => {
        tbl.increments();
        tbl.string("username", 120).notNullable().unique();
        tbl.string("password", 120).notNullable();
        tbl.string("email", 120).notNullable().unique();
      })
  
      .createTable("classes_volunteer_student", (tbl) => {
        tbl
          .integer("classes_id")
          .references("id")
          .inTable("classes")
          .unsigned()
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
  
        tbl
          .integer("volunteer_id")
          .references("id")
          .inTable("volunteer")
          .unsigned()
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
  
        tbl
          .integer("student_id")
          .references("id")
          .inTable("student")
          .unsigned()
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  
      .createTable("admin", (tbl) => {
        tbl.increments();
        tbl.string("username", 120).notNullable().unique();
        tbl.string("password", 120).notNullable();
        tbl.string("email", 120).notNullable().unique();
      });
  };
  exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("admin");
    await knex.schema.dropTableIfExists("classes_volunteer_students");
    await knex.schema.dropTableIfExists("student");
    await knex.schema.dropTableIfExists("volunteer");
    await knex.schema.dropTableIfExists("classes");
  };
