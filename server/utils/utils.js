exports.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

exports.formatTimestamp = function (timestamp) {
    var dateObj = new Date(timestamp);

    var year = dateObj.getYear() + 1900;
    var month = dateObj.getMonth() + 1;
    var theDate = dateObj.getDate();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    return year + "-" + month + "-" + theDate + " " + hour + ":" + minute + ":" + second;
}

exports.toJson = function (result) {
    return JSON.parse(JSON.stringify(result));
}

function createPartialMatch(search) {
    let map = {};
    for (let i = 0; i < search.length; i++) {
        if (i === 0) {
            map[i] = 0;
        } else {
            let str = search.substr(0, i + 1);
            for (let j = 0; j < i; j++) {
                // 获取前缀
                let beforestr = str.substr(0, j + 1);
                // 获取后缀
                let afterstr = str.substr(-j - 1);
                if (beforestr === afterstr) {
                    map[i] = beforestr.length;
                }
                if (!map[i]) {
                    map[i] = 0;
                }
            }
        }
    }
    return map;
}

exports.match = function (haystack, needle) {
    const n = haystack.length, m = needle.length;
    if (m === 0) {
        return 0;
    }
    const pi = new Array(m).fill(0);
    for (let i = 1, j = 0; i < m; i++) {
        while (j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1];
        }
        if (needle[i] == needle[j]) {
            j++;
        }
        pi[i] = j;
    }
    for (let i = 0, j = 0; i < n; i++) {
        while (j > 0 && haystack[i] != needle[j]) {
            j = pi[j - 1];
        }
        if (haystack[i] == needle[j]) {
            j++;
        }
        if (j === m) {
            return i - m + 1;
        }
    }
    return -1;
};
