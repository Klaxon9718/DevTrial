const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(

    ["/dept/"], //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: 'http://localhost:5000/', //타겟이 되는 api url
      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
    })
  );

  app.use(
    ["/deptYne/"], //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: 'http://localhost:5000/', //타겟이 되는 api url

      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
    })
  );

  //공통 모듈 요청 api
  app.use(
    ["/common/"], //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: 'http://localhost:5000/', //타겟이 되는 api url

      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
    })
  );
};


//https://velog.io/@lsx2003/CS-React-%EB%A6%AC%EC%95%A1%ED%8A%B8-Proxy-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
