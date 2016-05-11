(function(){
    try {
        if(!document.body){
            alert('please put the alloylever script reference between <body> and </body>');
            return;
        }
        new AlloyLever({
            hide: true,
            reportTo: 'xxx',
            height: '55%',
            index: 1,
            logs: [],
            tx: 0,
            ty: 0,
            timeline: [],
            xhrs: [],
            resources: {cookie: '', storage: ''}
        }, 'body');
    }catch(e) {
        alert(e);
    };

})()
