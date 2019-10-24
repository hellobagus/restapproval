
function listAllMenu(req, res) {
    const { knex } = req.app.locals;
    knex
    .select()
    .from('alfa_adm.mgr.sysMenu')
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error));
 
 }
 
 function listOneMenu( req, res) {
    const { knex } = req.app.locals;
    const { MenuID } = req.params;
    knex
    .select()
    .from('alfa_adm.mgr.sysMenu')
    .where({ MenuID: `${MenuID}`})
    .then(data => {
        if (data.length > 0 ) {
            return res.status(200).json(data)
        }else {
            return res.status(404).json(`Menu with MenuID ${MenuID} not found`);
        }
    })
    .catch(error => res.status(404).json(error));
 
 }
 
 
 function createMenu( req, res ) {
     const { knex } = req.app.locals;
     const payload = req.body;
     const mandatoryColumns = ['email', 'password', 'name', 'MenuID'];
     const payloadKeys = Object.keys(payload);
     const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc));
     if (mandatoryColumnsExists) {
         knex('alfa_adm.mgr.sysMenu')
         .insert(payload)
         .then(response => res.status(201).json('Menu Created'))
         .catch(error => res.status(500).json(error))
 
     }else{
         return res.status(400).json(`Mandatory Columns are required: ${mandatoryColumns}`)
     }
 }
 
 
 
 function updateMenu( res, req ) {
     const { knex } = req.app.locals;
     const { id } = req.params;
     const payload = req.body;
     knex('mgr.sysMenu')
         .where('MenuID', id)
         .update(payload)
         .then( response => {
              if(response) {
              return res.status(200).json()
              }
                  return res.status(404).json(`Menu with MenuID ${MenuID} not found`);
         })
         .catch(error => res.status(500).json(error));
 }
 
 function deleteMenu( res, req ) {
     const { knex } = req.app.locals;
     const { id } = req.params;
     knex('mgr.sysMenu')
         .where('rowID', id)
         .del()
         .then( response => {
             if(response) {
                 return res.status(200).json()
                 }
                     return res.status(404).json(`Menu with rowID ${rowID} not found`);
            })        .catch(error => res.status(500).json(error));
 }
 


 
 module.exports = {
     listAllMenu,
     listOneMenu,
     createMenu,
     updateMenu,
     deleteMenu,
 }