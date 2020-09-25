import React from 'react'

function Footer() {
    return (
        <div>
        <footer>
            <div className="container">
                <div className="row">
                <div className="footer-top-cms">
                    <div className="col-sm-9">
                    <div className="newslatter">
                        <form>
                        <h5>Newsletter</h5>
                        <div className="form-group row w-100 mx-auto">
                            <input type="text" className="form-control col-sm-8 col-12" placeholder="Email Here......" />
                            <div className="col-sm-4 col-12 mt-1 mt-sm-0 px-sm-1 px-0">
                                <button type="submit" value="Sign up" className="btn btn-primary h-100 w-100 w-sm-auto" style={{fontSize: "1.2rem"}}>Subscribe</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className="col-sm-5">
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-sm-3 footer-block">
                    <h5 className="footer-title">Information</h5>
                    <ul className="list-unstyled ul-wrapper">
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="checkout.html">Delivery Information</a></li>
                    <li><a href="/">Privacy Policy</a></li>
                    <li><a href="/">Terms &amp; Conditions</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 footer-block">
                    <h5 className="footer-title">Customer Service</h5>
                    <ul className="list-unstyled ul-wrapper">
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="/">Returns</a></li>
                    <li><a href="/">Site Map</a></li>
                    <li><a href="/">Wish List</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 footer-block">
                    <h5 className="footer-title">Extras</h5>
                    <ul className="list-unstyled ul-wrapper">
                    <li><a href="/">Brands</a></li>
                    <li><a href="gift.html">Gift Vouchers</a></li>
                    <li><a href="affiliate.html">Affiliates</a></li>
                    <li><a href="/">Specials</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 footer-block">
                    <div className="content_footercms_right">
                    <div className="footer-contact">
                        <h5 className="contact-title footer-title">Contact Us</h5>
                        <ul className="ul-wrapper">
                        <li><i className="fa fa-map-marker"></i><span className="location2"> Warehouse & Offices,
                            12345 Street name, California
                            USA</span></li>
                        <li><i className="fa fa-envelope"></i><span className="mail2"><a href="#">info@localhost.com</a></span></li>
                        <li><i className="fa fa-mobile"></i><span className="phone2">+91 0987-654-321</span></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        {/* <a id="scrollup">Scroll</a> */}
        </footer>
            <div className="footer-bottom" >
                <div className="container" >
                    <div className="copyright">
                        Powered By <a className="d-inline-block" href="http://www.lionode.com/">kissan &copy; 2020 </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
