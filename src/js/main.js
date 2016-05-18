var al = new AlloyLever({
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
});

$.ajax({
    url:'js/test2.json',
    success:function(json){

    }
})

//测试console
console.log('这是log信息')
console.info('这是info信息')
console.error('这是error信息',22222222)
console.debug('这是debug信息')
console.warn('这是warn信息')

console.log({'a':"我是复杂对象",b:1},{'a':"我是复杂对象",b:1},function a(){alert(1);})
window.addEventListener('DOMContentLoaded',function(){
    al.setNuclearContainer('body');
},false);
