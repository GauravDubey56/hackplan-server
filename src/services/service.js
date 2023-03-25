class Service {

  constructor(table_name) {
    this.table = table_name;
  }
  getAllItems(db) {
    return db
      .from(this.table)
      .select();
  }
  getItemById(db, id) {
    return db
      .from(this.table)
      .select()
      .where({ id })
      .first();
  }
  insertItem(db, item) {
    return db
      .into(this.table)
      .insert(item)
      .returning('*')
      .then(rows => rows[0]);
  }
  updateItem(db, id, data) {
    return db
      .from(this.table)
      .where({ id })
      .update(data);
  }
  deleteItem(db, id) {
    return db
      .from(this.table)
      .where({ id })
      .delete();
  }
}

module.exports = Service;