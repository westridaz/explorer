const fs = require('fs');
const split = require('split');
var settings = require('./settings');

module.exports = {
    get_seeder: function (cb) {
        let index = 0;
        let outData = [];
        let readStream = fs.createReadStream(settings.dnsseed.pathDump)
            .on('error', function (error) {
                console.log("Caught", error);
                return cb({});
            })
            .pipe(split())
            .on('data', function (line) {
                // Explode Line trough regex
                line = line.toString().match(new RegExp("[^\\n\\r\\t ]+", 'g'));

                //Go trough all lines except the first one since it is the header
                if (line) {
                    if (index != 0) {
                        let address = line[0].match(new RegExp("[^:]+", 'g'));
                        outData.push({
                            ipAddress: address[0],
                            port: address[1],
                            good: line[1],
                            lastSuccess: line[2],
                            last_2_hours: line[3],
                            last_8_hours: line[4],
                            last_1_day: line[5],
                            last_7_days: line[6],
                            last_30_days: line[7],
                            blockHeight: line[8],
                            svcs: line[9],
                            protocoll_version: line[10],
                            version: line[11].match("[a-zA-Z:\\d.\\d.\\d]+")[0]
                        })
                    }
                    index++;
                }
            })
            .on('end', function () {
                return cb(outData);
            });

    },

    download_seedlist: function (cb) {

        let index = 0;
        let date = new Date(Date.now()).toLocaleString();
        let returnstring = "##########################################\n";
        returnstring += "#    Ipsum.Network Add Nodes             #\n";
        returnstring += "#  Generated :" + date + "      #\n";
        returnstring += "##########################################\n";

        let readStream = fs.createReadStream(settings.dnsseed.pathDump)
            .on('error', function (error) {
                console.log("Caught", error);
                return cb({ err: true });
            })
            .pipe(split())
            .on('data', function (line) {
                // Explode Line trough regex
                line = line.toString().match(new RegExp("[^\\n\\r\\t ]+", 'g'));
                //Go trough all lines except the first one since it is the header
                if (line) {
                    if (index != 0 && line[1]==1) {
                        let address = line[0].match(new RegExp("[^:]+", 'g'));
                        returnstring += "addnode=" + address[0] + "\n";
                    }
                    index++;
                }
            })
            .on('end', function () {
                return cb(returnstring);
            });

    }
}