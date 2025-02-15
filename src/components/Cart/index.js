import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { increCount, decreCount, clearCart } from '../../store/modules/takeaway'
import { useEffect, useState } from 'react'

const Cart = () => {
  const { cartList } = useSelector(state => state.foods)
  //这里不用导入store或state，因为provider已经包含了整个应用
  //计算总价
  const totalPrice = cartList.reduce((a, c) => a + c.price * c.count, 0)
  const dispatch = useDispatch()

  //控制购物车打开或者关闭的状态
  const [visible, setVisible] = useState(false)
  const onShow = () => {
    if (cartList.length > 0) { setVisible(true) }
  }//只有在cartlist不为0时点击购物车才会显示列表

  useEffect(() => { if (cartList.length === 0) { setVisible(false) } }
    , [cartList])
  //在购物车列表中删除物品后，如果此时列表为空则自动退出

  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div onClick={() => setVisible(false)}
        className={classNames('cartOverlay', visible && 'visible')}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={onShow} className={classNames('icon', cartList > 0 && 'fill')}>
          {cartList.length > 0 && <div className="cartCornerMark">{cartList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {cartList.length > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', visible && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => {
            dispatch(clearCart());
            setVisible(false);
          }}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (

              <div div className="cartItem" key={item.id} >
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  {/**数量组件 */}
                  <Count
                    count={item.count}
                    onPlus={() => dispatch(increCount({ id: item.id }))}
                    onMinus={() => dispatch(decreCount({ id: item.id }))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}


export default Cart
