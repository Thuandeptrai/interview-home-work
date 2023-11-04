// Search post by keyword
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Input,
    Row,
    Col,
    Button,
    Space,
    Typography,
    Divider,
    Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { findPostByKeyWord } from "../services/postAPI";

const SearchComponents = () => {
    const dispatch = useDispatch();
    const { Search } = Input;
    const { Title } = Typography;
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearch = (value) => {
        setKeyword(value);
        findPostByKeyWord(value, current, pageSize).then((res) => {
            setTotal(res.count);
            setPosts(res.posts)
        });
    };
    const handlePageChange = (page, pageSize) => {
        setCurrent(page);
        findPostByKeyWord(keyword, page, pageSize).then((res) => {
            setTotal(res.count);
            setPosts(res.posts)
        });
    };
    // It show above the other components 
    return (
        <Row style={{
            zIndex: 35,
            position: "absolute",
            top: 13,
            left: "0",
            right: "0",
            margin: "auto",
            display: "flex",
            justifyContent: "center",

        }}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="medium"
                onSearch={handleSearch}
            />
            {keyword && (
                <>
                    {/* // content center  */}
                    <div style={{
                        backgroundColor: "#faad14",
                        paddingBottom: "20px",
                        borderRadius: "10px",
                        width: "300px",
                        borderWidth: "5px",
                        borderColor: "red",
                    }}>
                        <Divider />
                        <Space direction="vertical" style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                        }}>
                            {posts.length === 0 ? <Title level={5}>No result</Title>
                                : (posts.map((post) => (<>
                                    <div key={post.id}>
                                        <h5 style={
                                            {
                                                fontWeight: "bold",
                                            }
                                        }>{post.title}</h5>
                                    </div>

                                </>

                                )

                                ))}
                        </Space>
                        {posts.length !== 0 ? <>  <Pagination
                            current={current}
                            pageSize={pageSize}
                            total={total}
                            onChange={handlePageChange}
                        /></> : null}

                        <Divider />

                    </div>


                </>
            )}
        </Row>
    );
}
export default SearchComponents;