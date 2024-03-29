"use client"
import { IProduct } from "../../page";  
import { Component } from "react";
import BASE_PATH_FORAPI from "../Basepath";
import InfiniteScroll from "react-infinite-scroll-component";
import CardT from "../CardT";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import CardAll from "../CardAll";
import { oneProductType } from "../utlis/productDataAndTypes"; 


interface propType {
    productArray: Array<oneProductType>
}
export default class AllProductsCompo extends Component<{ ProductData: propType }> {
    start: number = 10;
    end: number = 20;
    state: { items: Array<oneProductType>, hasMore: boolean } = {
        items: [...this.props.ProductData.productArray],
        hasMore: true,
    }
    fetchDataFromApiGradually = async (start: number, end: number) => {
        const res = await fetch(`/api/products?start=${start}&end=${end}`);
        const dataToCheckAndSend = await res.json();
        if (dataToCheckAndSend.productArray === "Not found") {
            this.setState({ hasMore: false })
        }
        return dataToCheckAndSend;
    }
    getData = async () => {
        let allTogether = await this.fetchDataFromApiGradually(this.start, this.end);
        if (allTogether.productArray !== "Not found") {
            this.setState({
                items: this.state.items.concat(allTogether.productArray)
            })
        } else {
            this.setState({
                hasMore: false
            })
        }
        this.start = this.start + 10;
        this.end = this.end + 10;
    }
    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.getData}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className="content-center justify-center grid grid-cols-2 md:grid-cols-3 py-10 lg:grid-cols-4 gap-4">

                {this.state.items.map((item: oneProductType , index: number) => (
                    <CardAll key={index} singleProductData={item} />
                ))}
            </InfiniteScroll>
        )
    }


}