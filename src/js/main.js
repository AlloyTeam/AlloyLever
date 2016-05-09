var at = new AlloyLever({
    hide:true,
    reportTo:'xxx',
    height:'55%',
    index:1,
    logs:[],
    tx:0,
    ty:0,
    timeline:[],
    xhrs:[],
    resources:{cookie:'',storage:''}
},'body');

$.ajax({
    url:'js/test2.json',
    success:function(json){

    }
})

//测试console
console.log('这是log信息')
console.info('这是info信息')
console.error('这是error信息')
console.debug('这是debug信息')
console.warn('这是warn信息')
