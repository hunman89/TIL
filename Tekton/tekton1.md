## Tekton
> 클라우스 기반의 CI/CD system을 위한 오픈소스
* build, test, deploy를 on-promise 환경에서 가능하게 한다.

#### Setting
> Katakoda 환경에서 가볍게 실습하였다.

* Install the Tekton Dashboard Prerequisites
```shell
$ kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.20.0/release.yaml
```

* Install the Tekton Dashboard
```shell
$ kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/previous/v0.13.0/tekton-dashboard-release.yaml
```

* Verify the Dashboard pod is running
```shell
$ kubectl get pods -n tekton-pipelines

NAME                                           READY   STATUS    RESTARTS   AGE
tekton-dashboard-6b6c44d4c6-g7fgq              1/1     Running   0          8m39s
tekton-pipelines-controller-6dc5865c88-jr2mc   1/1     Running   0          9m40s
tekton-pipelines-webhook-5dd664cb65-n2blj      1/1     Running   0          9m38s
```

* Expose the Tekton Dashboard
```shell
$ kubectl get svc tekton-dashboard -n tekton-pipelines

NAME               TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
tekton-dashboard   ClusterIP   10.110.237.74   <none>        9097/TCP   9m34s
```

* Set up a port forward 
```shell
kubectl port-forward -n tekton-pipelines --address=0.0.0.0 service/tekton-dashboard 80:9097 > /dev/null 2>&1 &
```

* Open the Tekton Dashboard
> 80 port로 연결
> 여기서는 대쉬보드로 작업을 진행하고 있다.

* Import the MyApp Tekton resources
    > MyApp : demo nodejs app, MyApp displays a random picture of a cat
    * import resources 메뉴를 이용해 진행한다
    * Repository URL: https://github.com/ncskier/myapp
    * Repository path: tekton/
    * Service Account: tekton-dashboard
    * `Import and apply` 한 뒤, `View status of this run`를 눌러 진행 상황을 확인한다.

* Create the PipelineResource for MyApp
    * namespace를 선택한 후, `Create`한다.
    * Type: Git
    * URL: https://github.com/ncskier/myapp
    * Revision: master (master branch 를 이용할 것이다.) 

* Build & Deploy MyApp (PipelineRuns)
    * Pipeline: myapp
    * PipelineResources source: myapp

* Monitor the PipelineRun & View MyApp
    * `Succeeded`한 PipelineRun을 클릭해 `build`와 `deploy`를 확인한다.
    * 3000 port를 열어 확인한다. (port는 바뀔 수 있다.)
    ```shell
    $ kubectl port-forward --address=0.0.0.0 service/myapp 3000:3000 > /dev/null 2>&1 &
    ```
