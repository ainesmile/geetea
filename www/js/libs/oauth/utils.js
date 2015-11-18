angular.module("libs.oauth.utils", [])

    .factory("$OAuthUtils", ["$q", function($q) {

        return {

            /*
             * Check to see if the mandatory InAppBrowser plugin is installed
             *
             * @param
             * @return   boolean
             */
            isInAppBrowserInstalled: function(cordovaMetadata) {
                var inAppBrowserNames = ["cordova-plugin-inappbrowser", "org.apache.cordova.inappbrowser"];

                return inAppBrowserNames.some(function(name) {
                    return cordovaMetadata.hasOwnProperty(name);
                });
            },

            /*
            * Create Random String Nonce
            *
            * @param    integer length
            * @return   string
            */
            createNonce: function(length) {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for(var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            },

            /*
             * Generate Url Parameters Object From String.
             */
            generateUrlParameters: function (parameters) {
                var sortedKeys = Object.keys(parameters);
                sortedKeys.sort();

                var params = "";
                var amp = "";

                for (var i = 0 ; i < sortedKeys.length; i++) {
                    params += amp + sortedKeys[i] + "=" + parameters[sortedKeys[i]];
                    amp = "&";
                }

                return params;
            },

            /*
             * Parse Response Parameters String From Object.
             */
            parseResponseParameters: function (response) {
                if (response.split) {
                    var parameters = response.split("&");
                    var parameterMap = {};
                    for(var i = 0; i < parameters.length; i++) {
                        parameterMap[parameters[i].split("=")[0]] = parameters[i].split("=")[1];
                    }
                    return parameterMap;
                }
                else {
                    return {};
                }
            }
        };

    }]);
