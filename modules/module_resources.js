//module resources
//ce module permet de stocker dans une database la quantité de resources gagnées par un membre, après qu'il ait ouvert un booster
/*commandes : 
 * $booster : ouvre un booster de 5 ressources
 * $inventory : permet d'afficher la quantité de ressources du membre
 */

const mongo = require('../mongo');
const command = require('../command');
const userSchema = require('../schemas/user_schema');

module.exports = (client) => {

}