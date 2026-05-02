const Product =require('../models/Product')

exports.showHome=async (req,res)=>{
    try {
        let limit=5
        let search=req.body.search|| ''
        let page=req.body.page || 1

        const product =await Product({isDeleted:false}.skip((page-1)*limit).limit(limit))
        if(search){
            product.name={$regex:search,$option:i}
        }
        const total=await product.countDocument()
        const totalPage=Math.ceil(total/limit)
        res.render('/index',{
            product,
              currentPage:page,
            totalPages:totalPage,
            search,
            user:req.user,
            limit
        })
    } catch (error) {
        
    }
}
