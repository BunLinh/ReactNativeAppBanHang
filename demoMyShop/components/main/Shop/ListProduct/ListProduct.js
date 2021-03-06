/* eslint-disable quotes */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, Dimensions,
    FlatList, Image, ActivityIndicator
} from 'react-native';
import backList from '../../../../assets/img/backList.png';
import getListProductPage from '../../../../api/getListProductPage';

const { height } = Dimensions.get('window');
const url = 'http://192.168.1.7/app/images/product/';

export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            listProduct: [],
            page: 1,
        };
        this.arr = [];
    }

    componentDidMount() {
        const idType = this.props.category.id;
        getListProductPage(idType, 1)
            .then(arrProduct => {
                this.arr = arrProduct;
                this.setState({
                    listProduct: this.arr,
                    loading: false,
                    refreshing: false,
                });

                console.log(arrProduct);
            })
            .catch(e => console.log(e));
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    goToDetail(product) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', product });
    }

    handleRefresh() {
        this.setState({
            refreshing: true,
            // page: this.state.page + 1,
        },
            // () => {
            //     this.componentDidMount.bind(this)
            //     refreshing : false;
            // });
        );
        const newpage = this.state.page + 1;
        const idType = this.props.category.id;
        getListProductPage(idType, newpage)
            .then(arrProduct => {
                this.arr = arrProduct.concat(this.arr);
                this.setState({
                    ...this.state,
                    listProduct: this.arr,
                    refreshing: false

                });
            })
            .catch(e => console.log(e));
    }
    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%'
                }}
            />
        );
    }

    renderFooter = () => {
        if (!this.state.refreshing) return null;
        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE'
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    render() {
        const { listProduct } = this.state;
        const { category } = this.props;
        const { container, wapper, header, backStyle, titleStyle,
            proContainer, proImg, lastRowInfo, productInfo,
            txtName, txtPrice, txtUnit, txtColor, txtShowDetail

        } = styles;
        return (
            <View style={container}>
                <View style={wapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image source={backList} style={backStyle} />
                        </TouchableOpacity>
                        <Text style={titleStyle}>{category.name}</Text>
                        <View style={{ width: 30 }} />
                    </View>
                    <FlatList
                        removeClippedSubviews={false}
                        data={listProduct}
                        renderItem={({ item }) => (
                            <View style={proContainer}>
                                <Image source={{ uri: `${url}${item.images[0]}` }} style={proImg} />
                                <View style={productInfo}>
                                    <Text style={txtName}>{item.name}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={txtUnit}>đ</Text>
                                        <Text style={txtPrice}>{item.price}.000</Text>

                                    </View>
                                    <View style={lastRowInfo}>
                                        <Text style={txtColor} />
                                        <TouchableOpacity onPress={() => { this.goToDetail(item) }}>
                                            <Text style={txtShowDetail}>Show Detail</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        )}
                        // ItemSeparatorComponent={this.renderSeparator}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        paddingBottom: 10

    },
    wapper: {
        backgroundColor: 'white',
        elevation: 5,
        paddingHorizontal: 10
    },
    header: {
        height: height / 12,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    backStyle: {
        width: 40,
        height: 40,
    },
    proContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderTopColor: '#F0F0F0',
        borderTopWidth: 1,
        // marginBottom:10,
    },
    titleStyle: {
        fontSize: 17,
        color: '#8E24AA',

    },
    proImg: {
        width: 90,
        height: (90 * 960) / 750,
    },
    lastRowInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: 'stretch',
        alignItems: "center",
    },
    productInfo: {
        justifyContent: "space-between",
        marginLeft: 12,
        flex: 1,


    },
    txtName: {
        color: 'black',
        fontSize: 20,
        fontWeight: '100'

    },
    txtPrice: {
        color: '#8E24AA',
        fontSize: 20
        ,
    },
    txtUnit: {
        color: '#8E24AA',
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#8E24AA",
    },
    txtColor: {},
    txtShowDetail: {
        color: '#8E24AA',

    },


});