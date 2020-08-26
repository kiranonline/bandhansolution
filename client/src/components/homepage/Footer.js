import React from 'react'

function Footer() {
    return (
        <div>
        <footer>
            <div class="container">
                <div class="row">
                <div class="footer-top-cms">
                    <div class="col-sm-7">
                    <div class="newslatter">
                        <form>
                        <h5>Newsletter</h5>
                        <div class="input-group">
                            <input type="text" class=" form-control" placeholder="Email Here......" />
                            <button type="submit" value="Sign up" class="btn btn-large btn-primary">Subscribe</button>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div class="col-sm-5">
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-3 footer-block">
                    <h5 class="footer-title">Information</h5>
                    <ul class="list-unstyled ul-wrapper">
                    <li><a href="about-us.html">About Us</a></li>
                    <li><a href="checkout.html">Delivery Information</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    </ul>
                </div>
                <div class="col-sm-3 footer-block">
                    <h5 class="footer-title">Customer Service</h5>
                    <ul class="list-unstyled ul-wrapper">
                    <li><a href="contact.html">Contact Us</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">Site Map</a></li>
                    <li><a href="#">Wish List</a></li>
                    </ul>
                </div>
                <div class="col-sm-3 footer-block">
                    <h5 class="footer-title">Extras</h5>
                    <ul class="list-unstyled ul-wrapper">
                    <li><a href="#">Brands</a></li>
                    <li><a href="gift.html">Gift Vouchers</a></li>
                    <li><a href="affiliate.html">Affiliates</a></li>
                    <li><a href="#">Specials</a></li>
                    </ul>
                </div>
                <div class="col-sm-3 footer-block">
                    <div class="content_footercms_right">
                    <div class="footer-contact">
                        <h5 class="contact-title footer-title">Contact Us</h5>
                        <ul class="ul-wrapper">
                        <li><i class="fa fa-map-marker"></i><span class="location2"> Warehouse & Offices,
                            12345 Street name, California
                            USA</span></li>
                        <li><i class="fa fa-envelope"></i><span class="mail2"><a href="#">info@localhost.com</a></span></li>
                        <li><i class="fa fa-mobile"></i><span class="phone2">+91 0987-654-321</span></li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        {/* <a id="scrollup">Scroll</a> */}
        </footer>
            <div class="footer-bottom">
                <div class="container">
                    <div class="copyright">
                        Powered By &nbsp;<a class="yourstore" href="http://www.lionode.com/">kissan &copy; 2020 </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
