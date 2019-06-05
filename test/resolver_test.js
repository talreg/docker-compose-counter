const ServiceResolver=require('../service-resolver')
const  expect= require('expect.js')
describe('testing dns',()=>{
  describe('testing localhost',()=>{
    process.env["NODE_ENV"]="";
    let serviceResolver=new ServiceResolver();
    it('should return localhost as environment',()=>{
      expect(serviceResolver.environment).to.be("localhost")
    })
    it('should return localhost with no sysvar',()=>{
      expect(serviceResolver.getDNSforService("redis")).to.be("localhost")
    })
    it('should return false for kubernetes',()=>{
      expect(serviceResolver.runningInKubernetes).to.be(false)
    })
    it('should return undefined namespace for kubernetes',()=>{
      expect(serviceResolver.kubernetesNamespace).to.be(undefined)
    })
  })
  describe('testing with dns',()=>{
    const expectedServiceName="redis_test"
    process.env["NODE_ENV"]="test";
    let serviceResolver=new ServiceResolver();
    it('should return test as environment',()=>{
      expect(serviceResolver.environment).to.be("test")
    })
    it('should return service with environment var',()=>{
      expect(serviceResolver.getDNSforService("redis")).to.be(expectedServiceName)
    })
  })
  describe('testing with kubernetes',()=>{
    process.env["RUNNER"]="kubernetes";
    let serviceResolver=new ServiceResolver();
    it('should return true for kubernetes',()=>{
      expect(serviceResolver.runningInKubernetes).to.be(true)
    })
    it('should return empty namespace for kubernetes',()=>{
      expect(serviceResolver.kubernetesNamespace).to.be("")
    })
  })
})
