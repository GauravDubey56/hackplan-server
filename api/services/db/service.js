class Service {
  constructor(table_name) {
    if(!table_name) {
      throw new Error('Table name is needed to instantiate service layer')
    }
    this.table = table_name;
  }
  getAllItems(db) {
    return db.from(this.table).select();
  }
  getItemById(db, id) {
    return db.from(this.table).select().where({ id }).first();
  }
  getWhere(db, filters, columns) {
    return db
      .from(this.table)
      .select(Array.isArray(columns) ? columns : ["*"])
      .where(filters);
  }
  insertItem(db, item) {
    return db
      .into(this.table)
      .insert(item)
      .returning("*")
      .then((rows) => rows[0]);
  }
  updateItem(db, id, data) {
    return db.from(this.table).where({ id }).update(data);
  }
  deleteItem(db, id) {
    return db.from(this.table).where({ id }).delete();
  }
}

module.exports = Service;
