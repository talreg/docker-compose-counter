class ServiceResolver {
  constructor() {
    this._environment=process.env["NODE_ENV"]
    if(this._environment&&this._environment.trim()=="")
      this._environment=null
    if(process.env["RUNNER"]=="kubernetes")
      this._kubernetes=true
    else
      this._kubernetes=false
    if(this.runningInKubernetes){
        process.env["KUBERNETES_NAMESPACE"]?this._kubernetesNamespace=process.env["KUBERNETES_NAMESPACE"]:this._kubernetesNamespace=""
    }
  }

  getDNSforService(serviceName){
      if (!this._environment){
        return "localhost"
      }
      if(this.runningInKubernetes){
        if (this.kubernetesNamespace!="")
          return `${serviceName}.${this.kubernetesNamespace}.svc.cluster.local`
        else
          return `${serviceName}.svc.cluster.local`
      }
      return `${serviceName}_${this._environment}`
  }

  get runningInKubernetes(){
    return this._kubernetes;
  }

  get kubernetesNamespace(){
    return this._kubernetesNamespace
  }

  get environment(){
    if (!this._environment){
      return "localhost"
    }
    return this._environment
  }
}


module.exports=ServiceResolver
