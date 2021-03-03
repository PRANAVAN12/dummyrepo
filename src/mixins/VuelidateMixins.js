var VuelidateMixin = {
    methods: {
        getname() {
            let modelname = this.$vnode.data.model.expression.replace('.$model', '')
            modelname = modelname.substring(
                modelname.lastIndexOf('.') + 1,
                modelname.length
            )
            return modelname
        },
    }
}

export default VuelidateMixin