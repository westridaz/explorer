var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/*
 {
    "rank": 1,
    "ip": "103.13.29.36",
    "port": 6565,
    "network": "ipv4",
    "txhash": "1866af0c24bd4169118ee32df412bfabe936267b2566b8be252c6aca7022df90",
    "outidx": 1,
    "status": "ENABLED",
    "addr": "FTzsugc9FFK7BSw8o9tEfdRmQHFw6k6aN3",
    "version": 70950,
    "lastseen": 1536984573,
    "activetime": 1516003,
    "lastpaid": 1536978998
  },

*/

var MasternodeSchema = new Schema({
  
  rank: { type: Number, default: 0 },
  ip: { type: String, default: "" },
  port: { type: Number, default: 0 },
  network: { type: String, default: "" },
  txhash: { type: String, default: "" },
  outidx : { type: Number, default: 0},
  status : { type: String, default: "" },
  addr: { type: String, unique: true, index: true},
  version : { type: Number, default: 0},
  lastseen: { type: Number, default: 0 },
  activetime: { type: Number, default: 0 },
  lastpaid: { type: Number, default: 0 }
}, {id: false});


module.exports = mongoose.model('Masternode', MasternodeSchema);

