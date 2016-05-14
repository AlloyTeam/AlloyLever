(function(){
    try {
        var al=new AlloyLever({
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
        });

        window.addEventListener('load',function(){
            al.setNuclearContainer('body');
        },false);
    }catch(e) {
        alert(e);
    };

})()
