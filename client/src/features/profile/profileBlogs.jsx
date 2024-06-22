import { format } from "date-fns/format";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog } from "@mui/material";
import { deleteBlogsUser } from "../../services/client/user.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function ProfileBlogs(props) {
  const blogs = props.blogs;
  console.log(blogs);

  const { id } = useSelector((state) => state.user);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { user_id } = useParams();

  const navigate = useNavigate();

  const handleRedirect = (blog_id) => {
    navigate(`/blogs/${blog_id}`);
  };

  const deleteReview = async () => {
    try {
      const res = await deleteBlogsUser(deleteId, user_id);
      console.log(res.data);
      toast.success(res.data.message);
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const handleDeleteDialog = (review_id) => {
    setDeleteId(review_id);
    setOpenDeleteDialog(true);
  };
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="w-[65rem] h-[18rem] "
    >
      {blogs != null ? (
        blogs?.map((blog) => (
          <SwiperSlide className="" key={blog?.blog_id}>
            <div className="relative h-full overflow-hidden rounded-lg ">
              <div
                onClick={() => handleRedirect(blog?.blog_id)}
                className="hover:scale-105 duration-500 rounded-lg h-full cursor-pointer"
              >
                <img
                  alt="nopehehe"
                  className=" h-full rounded-lg object-cover"
                  src={blog?.picture}
                ></img>
                <div className="absolute bottom-4 left-4 text-white ">
                  <p className="font-semibold ">{blog?.title}</p>
                  <p className="line-clamp-3 mt-2 mr-2 text-xs">
                    {blog?.content}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handleDeleteDialog(blog?.blog_id)}
                className="absolute top-4 right-4 font-bold text-xl text-white cursor-pointer"
              >
                <RxCross1 />
              </div>
              <div
                onClick={() => navigate(`/blogs/updateBlogs/${blog?.blog_id}`)}
                className="absolute top-3 right-12 hover:underline text-lg font-semibold  text-white cursor-pointer"
              >
                Edit
              </div>
            </div>
            <Dialog
              className="absolute"
              open={openDeleteDialog}
              onClose={() => {
                setOpenDeleteDialog(false);
                setDeleteId(null);
              }}
            >
              <div className=" flex max-w-lg flex-col items-center rounded-md border px-8 py-10 text-gray-800 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 rounded-xl bg-red-50 p-2 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <p className="mt-4 text-center text-xl font-bold">
                  Do you want to delete this blog?
                </p>
                <p className="mt-2 text-center text-lg">
                  Are you sure you want to delete the blog ?
                </p>
                <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <button
                    className="whitespace-nowrap rounded-md bg-violet-950 px-4 py-3 font-medium text-white"
                    onClick={deleteReview}
                  >
                    Yes, delete the blog
                  </button>
                  <button
                    className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
                    onClick={() => {
                      setOpenDeleteDialog(false);
                      setDeleteId(null);
                    }}
                  >
                    Cancel, keep the blog
                  </button>
                </div>
              </div>
            </Dialog>
          </SwiperSlide>
        ))
      ) : (
        <div>
          <p>No reviews</p>
        </div>
      )}
    </Swiper>
  );
}
