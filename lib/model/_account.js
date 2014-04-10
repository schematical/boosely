module.exports = exports = function lastModifiedPlugin (schema, options) {
    schema.add({ username: String });
    schema.add({ notes: String });
    schema.add({ name: String });
    schema.add({ url: String });
    schema.add({ active_date: Date });

 /*   schema.pre('save', function (next) {
        this.lastMod = new Date
        next()
    })
*/
   /* if (options && options.index) {
        schema.path('lastMod').index(options.index)
    }*/
}