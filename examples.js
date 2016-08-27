const request = require('request');
const spec = require('./swagger.json');
const async = require('async');
async.eachSeries(Object.keys(spec.paths), function (path, cb)
{
  var url = spec.host + spec.basePath + path;
  url = url.replace(/{match_id}/, '2596808629');
  url = url.replace(/{account_id}/, '88367253');
  url = url.replace(/{hero_id}/, '1');
  url = url.replace(/{field}/, 'kills');
  url += '?q=snifflehopper&hero_id=1';
  console.error(url);
  request('http://' + url, function (err, resp, body)
  {
    if (err)
    {
      throw err;
    }
    body = JSON.parse(body);
    var schema = {};
    if (Array.isArray(body))
    {
      schema.type = "array";
    }
    else
    {
      Object.keys(body).forEach(function (k)
      {
        schema[k] = typeof(body[k]);
      });
    }
    console.error(schema);
    spec.paths[path].get.responses[200].schema = schema;
    setTimeout(function ()
    {
      cb(err);
    }, 2000);
  });
}, function (err)
{
  if (err)
  {
    throw err;
  }
  console.log(JSON.stringify(spec, null, 2));
});
