import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-black  py-10 px-80 ">
      <div>
        <div className="flex justify-center flex-col items-center">
          <div>
            <h1 className="font-semibold text-xl">
              Trải nghiệm tốt nhất chỉ cod trên iQIYI APP
            </h1>
          </div>
          <div>
            <p>
              <span className="text-green-500 text-sm">
                <i className="fa-solid fa-magnifying-glass"></i> iQIYI
              </span>{" "}
              <span className="text-gray-400 text-sm">
                Tìm kiếm trong cửa hàng ứng dụng dành cho thiết bị di dộng
              </span>
            </p>
          </div>
          <div className="flex  my-10">
            <button className="text-white button-gray mx-16 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
              <i className="mr-2 fa-solid fa-mobile-screen"></i>
              <span>Điện thoại</span>
            </button>
            <button className="text-white button-gray mx-16 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
              <i className="mr-2 fa-solid fa-tv"></i>
              <span>Trên TV</span>
            </button>
            <button className="text-white button-gray mx-16 flex items-center p-2 px-4 rounded-lg hover:bg-green-500">
              <i className="mr-2 fa-solid fa-laptop"></i>
              <span>Trên trang web</span>
            </button>
          </div>{" "}
        </div>
        <hr />
      </div>
      <div className="flex justify-between mt-10">
        <div>
          <h3 className="text-gray-50">Giới thiệu về chúng tôi</h3>
          <ul>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Thông tin công ty
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Giới thiệu dịch vụ sản phẩm
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Cách xem
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-50">Hợp tác</h3>
          <ul>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Đăng quảng cáo
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Quan hệ kinh doanh
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Hợp tác cài đặt trước
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-50">Hỗ trợ và giúp đỡ</h3>
          <ul>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Phản ánh ý kiến
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Trung tâm phản hồi bảo mật
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                câu hỏi thường gặp
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-50">Điều khoản dịch vụ</h3>
          <ul>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Điều khoản quyền riêng tư
              </a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-sm hover:text-green-500">
                Diều khoản sử dụng
              </a>
            </li>
            <li></li>
          </ul>
        </div>
        <div className="">
          <section className="flex items-center button-gray rounded-lg p-2 cursor-pointer bg-white text-black">
            <i className="fa-solid fa-globe mr-1 rounded-lg"></i>
            <select className="">
              <option value="">Tiếng Việt</option>
              <option value="">English</option>
              <option value="">s</option>
              <option value="">English</option>
            </select>
          </section>
        </div>
      </div>
      <div className="text-gray-400 text-xs mt-5">
        <p className="my-2">Copyright © 2021 iQIYI All Rights Reserved</p>
        <p className="w-4/5 mt-5">
          Chúng tôi sử dụng Cookies để cải thiện trải nghiệm sử dụng của bạn.
          Nếu bạn tiếp tục sử dụng trang web của chúng tôi, có nghĩa là bạn đồng
          ý chúng tôi sử dụng Cookies. Đọc <a href="">Chính sách quyền riêng tư <span className="text-green-500">iQIYI</span></a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
