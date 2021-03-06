/*global require:false, module:false*/

var config = require('./spid-config'),
    util = require('./spid-util');

function _encode(redirect_uri) {
    return encodeURIComponent(redirect_uri || window.location.toString());
}

function build(path, params) {
    return util.buildUri(config.server(), path, params);
}

function login(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'response_type': 'code',
        'flow': 'signup',
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('login', params);
}

function signup(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'response_type': 'code',
        'flow': 'signup',
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('signup', params);
}

function logout(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'response_type': 'code',
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('logout', params);
}

function account(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('account/summary', params);
}

function purchaseHistory(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('account/purchasehistory', params);
}

function subscriptions(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('account/subscriptions', params);
}

function products(redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri)
    };
    return build('account/products', params);
}

function redeem(voucher_code, redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri),
        'voucher_code': voucher_code || null
    };
    return build('account/redeem', params);
}

function purchaseProduct(product_id, redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'response_type': 'code',
        'flow': 'payment',
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri),
        'product_id': product_id || null
    };
    return build('auth/start', params);
}

function purchaseCampaign(campaign_id, product_id, voucher_code, redirect_uri, client_id) {
    var options = config.options();
    var params = {
        'response_type': 'code',
        'flow': 'payment',
        'client_id': client_id || options.client_id,
        'redirect_uri': _encode(redirect_uri),
        'campaign_id': campaign_id || null,
        'product_id': product_id || null,
        'voucher_code': voucher_code || null
    };
    return build('auth/start', params);
}

module.exports = {
    init: function(opts) {
        config.init(opts);
    },
    build: build,
    login: login,
    signup: signup,
    logout: logout,
    account: account,
    purchaseHistory: purchaseHistory,
    subscriptions: subscriptions,
    products: products,
    redeem: redeem,
    purchaseProduct: purchaseProduct,
    purchaseCampaign: purchaseCampaign
};