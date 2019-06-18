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
      expect(serviceResolver.kubernetesNamespace).to.be('default')
    })
  })
  describe('testing with dns',()=>{
    const expectedServiceName="redis.test"
    process.env["NODE_ENV"]="test";
    let serviceResolver=new ServiceResolver();

    it('should return test as environment',()=>{
      expect(serviceResolver.environment).to.be("test")
    })

    it('should return service with environment var',()=>{
      expect(serviceResolver.getDNSforService("redis")).to.be(expectedServiceName)
    })

    it('should use suffix when one exists',()=>{
      delete process.env["RUNNER"];
      let serviceResolver2=new ServiceResolver()
      serviceResolver2.suffix="btrz"
      expect(serviceResolver2.suffix).to.be.equal("btrz")
      expect(serviceResolver2.runningInKubernetes).to.be.false
      expect(serviceResolver2.getDNSforService("redis")).to.be("redis.test.btrz")
    })

  })
  describe('testing with kubernetes',()=>{
    process.env["RUNNER"]="kubernetes";
    let serviceResolver=new ServiceResolver();
    it('should return true for kubernetes',()=>{
      expect(serviceResolver.runningInKubernetes).to.be(true)
    })
    it('should return default namespace for kubernetes',()=>{
      expect(serviceResolver.kubernetesNamespace).to.be("default")
    })
    it('service name for kubernetes',()=>{
      expect(serviceResolver.getDNSforService("redis")).to.be("redis.default.svc.cluster.local")
    })

    it('should return sandbox namespace for kubernetes',()=>{
      process.env["RUNNER"]="kubernetes";
      process.env["KUBERNETES_NAMESPACE"]="sandbox";
      let serviceResolver=new ServiceResolver();
      expect(serviceResolver.kubernetesNamespace).to.be("sandbox")
      expect(serviceResolver.getDNSforService("redis")).to.be("redis.sandbox.svc.cluster.local")
    })
  })
})
