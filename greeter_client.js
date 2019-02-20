/*
 *
 * Copyright 2015, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

var path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const hl = require('highland')

const PROTO_PATH = path.resolve(__dirname, './protos/helloworld.proto')

const pd = protoLoader.loadSync(PROTO_PATH)
const loaded = grpc.loadPackageDefinition(pd)
const hello_proto = loaded.helloworld

function main () {
  var client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure())
  var user
  if (process.argv.length >= 3) {
    user = process.argv[2]
  } else {
    user = 'world'
  }
  client.sayHello({ name: user }, function (err, response) {
    console.log('Greeting:', response.message)
  })
 

  let call = client.sayHellos({ name: user })
  call.on('data', (data) => {
    console.log(data.message);
  })

  let call2 = client.SayHelloCS(function (err, response) {
    console.log('Greeting:', response.message)
  })

  // const call = client.processSecrets((err, result) => {
  //   if (err) console.log(err)
  //   console.dir(result)
  //   process.exit(0)
  // })

  // const input = fs.createReadStream(DBFILE)

  hl([{
    name: 'Hello Bssob'
  },
  {
    name: 'Hello Kasdfate'
  },
  {
    name: 'Hello Jasdfim'
  },
  {
    name: 'Hello Sasdfara'
  }
  ])
    // .through(JSONStream.parse('*'))
    .each(d => call2.write(d))
    .done(() => call2.end())



    let call3 = client.SayHelloBidi(function (err, response) {
      console.log('Greeting:', response.message)
    })
  
    // const call = client.processSecrets((err, result) => {
    //   if (err) console.log(err)
    //   console.dir(result)
    //   process.exit(0)
    // })
  
    // const input = fs.createReadStream(DBFILE)
  
    hl([{
      name: 'Hello Bssob'
    },
    {
      name: 'Hello Kasdfate'
    },
    {
      name: 'Hello Jasdfim'
    },
    {
      name: 'Hello Sasdfara'
    }
    ])
      // .through(JSONStream.parse('*'))
      .each(d => call3.write(d))
      .done(() => call3.end())

  call3.on('data', (data) => {
    console.log(data.message);
  })
  // var meta = new grpc.Metadata();
  // meta.add('name', 'Bssob');
  // call2.send(, meta, function (err, response) {
  //   console.log('sayhellocs:', response.message)
  // });
  // call2.write()
}

main()
