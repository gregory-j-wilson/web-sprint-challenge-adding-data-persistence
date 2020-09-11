
exports.up = function(knex) {

    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments()
            tbl.text('project_name', 255)
                .notNullable()
            tbl.text('description')
            tbl.boolean('completed')
                .defaultTo(false)
        })
        .createTable('resources', tbl => {
            tbl.increments()
            tbl.text('resource_name', 255)
                .notNullable()
                .unique()
            tbl.text('description')
        })
        .createTable('project_resources', tbl => {
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
        })
        .createTable('tasks', tbl => {
            tbl.increments()
            tbl.text('description')
                .notNullable()
            tbl.text('notes')
            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false)
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id').inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('RESTRICT')
        })
  
};

exports.down = function(knex) {

    return knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
  
};
