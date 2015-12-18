(function () {
    var jsApp = angular.module('Technician-Mobile-App.common.services.utils', []);

    jsApp.factory('utils', function (constants, $log) {

        function getCleanString(s) {
            if (typeof s === 'undefined' || s === null) {
                return null;
            }
            else {
                return s.trim();
            }
        }

        return {
            object: {
                // get the values of all properties of the object as an array
                getPropertyValuesAsArray: function (obj) {
                    var result = [], prop, i;

                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(obj[prop]);
                        }
                    }
                    return result;
                }
            },
            array : {
                /*
                gets first element that satisfies the predicate or returns null
                this uses array.filter function
                */
                getFirstItem: function (coll, predicate, thisArg) {
                    var res = null;
                    if (coll) {
                        var selection = coll.filter(predicate, thisArg);
                        res = selection.length ? selection[0] : null;
                    }
                    return res;
                },
                // removes all items from the array that satisfy the predicate.
                removeItem: function (array, predicate) {
                    for (var i = array.length - 1; i >= 0; i--) {
                        if (predicate(array[i])) {
                            array.splice(i, 1);
                        }
                    }
                },
                // get the sum of numerical values of a field in an object list
                getSum: function (coll, fieldName) {
                    var res = 0;
                    try {
                        if (coll && angular.isArray(coll)) {
                            coll.forEach(function (obj) {
                                var val = obj[fieldName];
                                if (val && angular.isNumber(val) && !isNaN(val)) {
                                    res += val;
                                }
                            });
                        }
                    }
                    catch (err) {
                        $log.error(err);
                    }
                    return res;
                },
                // test whether an item exists in the collection using a predicate
                exists: function (coll, predicate, thisArg) {
                    var res = false;
                    if (coll) {
                        var selection = coll.filter(predicate, thisArg);
                        res = selection.length > 0;
                    }
                    return res;
                },
                // tests whether an arr contains an object
                // use $.inArray of jQuery
                contains: function (arr, obj) {
                    var result = false;
                    if (arr && angular.isArray(arr) && obj) {
                        var i = arr.length;
                        while (i--) {
                            if (angular.equals(arr[i], obj)) {
                                return true;
                            }
                        }
                    }
                    return result;
                },
                // returns an array with unique members
                arrayUnique: function arrayUnique(array) {
                    var a = array.concat();
                    for (var i = 0; i < a.length; ++i) {
                        for (var j = i + 1; j < a.length; ++j) {
                            if (a[i] === a[j]) {
                                a.splice(j--, 1);
                            }
                        }
                    }

                    return a;
                },
                // return true if it is an array with minimum 1 element
                isNonEmptyArray: function (array) {
                    if (array && angular.isArray(array) && array.length > 0) {

                        var a = array.filter(function (item) { return angular.isDefined(item) && item !== null; });
                        if (a.length > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }

                    }
                    else {
                        return false;
                    }
                }
            },

            date : {
                /*
                * parse a microsoft WCF date string as a js string
                * depricated
                */
                parseMicrosoftJsonDateTime: function (content) {
                    try {
                        //Methode 1
                        //content = content.replace(/\//g, '');
                        //var contentDate = eval('new ' + content);// jshint ignore:line
                        //Methode 2
                        var contentDate = parseInt(content.substr(6));
                        //Methode 3
                        var re = /-?\d+/;
                        var m = re.exec(content);
                        var d = parseInt(m[0]);
                        return new Date(d);
                    } catch (ex) {
                        return content;
                    }
                },
                // EQX uses sometimes sql min date for null, for some silly reason
                // for ex. DAEMB: 1753-01-01T00:00:00
                isDBMinDateOrNull: function (dateVal) {
                    var result = false;
                    try {
                        if (!dateVal) {
                            result = true;
                        }
                        else if (angular.isDate(dateVal)) {
                            if (dateVal.getFullYear() === 1753) {
                                result = true;
                            }
                        }
                        else if (angular.isString(dateVal)) {
                            var d = new Date(Date.parse(dateVal));
                            if (d && d.getFullYear) {
                                if (d.getFullYear() === 1753) {
                                    result = true;
                                }
                            }
                        }
                    }
                    catch (err) {
                        $log.error(err);
                    }

                    return result;
                },
                // returns a string '2013-07-18' from 2013-07-18T00:00:00 otherwise ''
                getDatePartFromIso: function (dateString) {
                    var result = '';
                    if (dateString && angular.isString(dateString)) {
                        var matches = dateString.match(/^\d{4}-\d{2}-\d{2}/g);
                        if (matches && matches.length > 0) {
                            result = matches[0];
                        }
                    }
                    return result;
                },
                // gets a date from a string in a secured way
                getDate: function (str) {
                    var result = null;
                    if (str && angular.isString(str)) {
                        try {
                            result = new Date(Date.parse(str));
                            // beware of invalid dates
                            // invalid dates are date object where getDate() returns NaN
                            if (isNaN(result.getDate())) {
                                result = null;
                            }
                        }
                        catch (err) {
                            $log.error(err);
                        }
                    }
                    return result;
                },
                // returns the difference between two dates expressed in miliseconds. This might be negative if the first is smaller than the second.
                // returns undefined if the diff is impossible
                getTimeDiff: function (date1, date2) {
                    var result;
                    if (angular.isDate(date1) && angular.isDate(date2)) {
                        result = date1.getTime() - date2.getTime();
                    }
                    return result;
                },


            },

            string : {
                // returns null for undefined and null otherwise returns the trimmed string
                // empty string returns the empty string
                getCleanStr: function (s) {
                    return getCleanString(s);
                },
                // get the string all lower case, first letter upper case
                getFirstLetterUpper: function (str) {
                    var result = '';
                    if (str && str.length > 0) {
                        result = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
                    }
                    return result;
                },
                // compares two strings or string objects
                // strings are compared after having been trimmed
                // empty, null and undefined are concidered equal
                // if one of the arguments is not a string or not a string object then return false
                areLooslyEqual: function (s1, s2) {
                    if ((typeof s1 === 'undefined' || s1 === null || s1 === '') &&
                        (typeof s2 === 'undefined' || s2 === null || s2 === '')) {
                        return true;
                    }
                    if (typeof s1 !== 'undefined' && s1 !== null && (angular.isString(s1) || s1 instanceof String) &&
                        typeof s2 !== 'undefined' && s2 !== null && (angular.isString(s2) || s2 instanceof String)) {
                        // type coercion, trim and compare
                        return s1.trim() === s2.trim();
                    }
                    else {
                        return false;
                    }
                },
                // standard hash code implementation with int size test
                getHashCode: function (str) {
                    var hash = 0,
                        char,
                        i;

                    if (str.length === 0) {
                        return hash;
                    }
                    for (i = 0; i < str.length; i++) {
                        char = str.charCodeAt(i);
                        hash = ((hash << 5) - hash) + char;
                        hash = hash & hash; // Convert to 32bit integer
                    }
                    return hash;
                }

            },
            number : {
                // returns number of decimal at power of 10
                getCorrectionFactor: function (num) {
                    if (angular.isNumber(num)) {
                        var parts = num.toString().split('.');

                        return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);

                    }
                    else {
                        return 1;
                    }
                },
                // returns a number with n digits rounded
                // if num is not primitive number return 0 
                roundDigits: function (num, n) {
                    if (angular.isNumber(num)) {
                        n = angular.isNumber(n) ? Math.floor(n) : 0;
                        var i = this.getCorrectionFactor(num);
                        if (i > Math.pow(10, n)) {
                            return Math.round(Math.round(num * i) / (i / Math.pow(10, n))) / Math.pow(10, n);
                        }
                        else {
                            return num;
                        }
                    }
                    else {
                        return 0;
                    }
                },
                // returns a + b
                // if a or b are not primitives numbers return 0 
                addNumbers: function (a, b) {
                    if (angular.isNumber(a) && angular.isNumber(b)) {
                        var iA = this.getCorrectionFactor(a);
                        var iB = this.getCorrectionFactor(b);
                        var i = (iA > iB) ? iA : iB;

                        return (Math.round(i * a) + Math.round(i * b)) / i;
                    }
                    else {
                        return 0;
                    }
                },
                // returns a * b
                // if a or b are not primitives numbers return 0 
                multiplyNumbers: function (a, b) {
                    if (angular.isNumber(a) && angular.isNumber(b)) {

                        var iA = this.getCorrectionFactor(a);
                        var iB = this.getCorrectionFactor(b);

                        return (Math.round(iA * a) * Math.round(iB * b)) / (iA * iB);

                    }
                    else {
                        return 0;
                    }
                },
                // returns a / b
                // if a or b are not primitives numbers return 0 
                // if b = 0 retrun 0
                divideNumbers: function (a, b) {
                    if (angular.isNumber(a) && angular.isNumber(b) && b !== 0) {
                        var iA = this.getCorrectionFactor(a);
                        var iB = this.getCorrectionFactor(b);
                        var i = (iA > iB) ? iA : iB;

                        return Math.round(i * a) / Math.round(i * b);
                    }
                    else {
                        return 0;
                    }
                }
            },

            // fonction de comparaison de ma liste de client
            clientAgeComparer: function (a, b) {
                if (a && b && a.AGE && b.AGE && angular.isNumber(a.AGE) && angular.isNumber(b.AGE)) {
                    return a.AGE - b.AGE;
                }
                else {
                    return 0;
                }
            },

            // takes the refObject and transforms it into a list of key/values pairs (eg for drop down lists)
            getListFromReferential : function (refObj) {
            var result = [];
                if (refObj) {
                    for (var p in refObj) {
                        if (refObj.hasOwnProperty(p)) {
                            result.push({ key: p, value: refObj[p] });
                        }
                    }
                }
                return result;
            },


        };
    });

}());

