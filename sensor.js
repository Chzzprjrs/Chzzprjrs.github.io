/*
sdk的初始化和组织
*/

/**
 * @fileoverview sensors analytic javascript sdk
 * @author shengyonggen@sensorsdata.cn
 * 神策数据 www.sensorsdata.cn ，长期招聘 前端SDK开发工程师 ，简历求发送到我邮箱，谢谢
 */

(function (factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
})(function () {
  try {
    var sd = {};

sd.modules = {};

var _ = (sd._ = {});

/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
;(function () {
  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };
  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this;

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root.Object());
    exports || (exports = root.Object());

    // Native constructor aliases.
    var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined;

    // Internal: Contains `try...catch` logic used by other functions.
    // This prevents other functions from being deoptimized.
    function attempt(func, errorFunc) {
      try {
        func();
      } catch (exception) {
        if (errorFunc) {
          errorFunc();
        }
      }
    }

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    attempt(function () {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    });

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] != null) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
      } else if (name == "date-serialization") {
        // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
        isSupported = has("json-stringify") && isExtended;
        if (isSupported) {
          var stringify = exports.stringify;
          attempt(function () {
            isSupported =
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          });
        }
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            attempt(function () {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undefined &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undefined) === undefined &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undefined &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undefined]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undefined, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
            }, function () {
              stringifySupported = false;
            });
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse, parseSupported;
          if (typeof parse == "function") {
            attempt(function () {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  attempt(function () {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  });
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    });
                  }
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    });
                  }
                }
              }
            }, function () {
              parseSupported = false;
            });
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }
    has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      var forOwn = function (object, callback) {
        var size = 0, Properties, dontEnums, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        dontEnums = new Properties();
        for (property in dontEnums) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(dontEnums, property)) {
            size++;
          }
        }
        Properties = dontEnums = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = dontEnums.length; property = dontEnums[--length];) {
              if (hasProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forOwn(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify") && !has("date-serialization")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Serializes a date object.
        var serializeDate = function (value) {
          var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
          // Define additional utility methods if the `Date` methods are buggy.
          if (!isExtended) {
            var floor = Math.floor;
            // A mapping between the months of the year and the number of days between
            // January 1st and the first of the respective month.
            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            // Internal: Calculates the number of days between the Unix epoch and the
            // first day of the given month.
            var getDay = function (year, month) {
              return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
            getData = function (value) {
              // Manually compute the year, month, date, hours, minutes,
              // seconds, and milliseconds if the `getUTC*` methods are
              // buggy. Adapted from @Yaffle's `date-shim` project.
              date = floor(value / 864e5);
              for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
              for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
              date = 1 + date - getDay(year, month);
              // The `time` value specifies the time within the day (see ES
              // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
              // to compute `A modulo B`, as the `%` operator does not
              // correspond to the `modulo` operation for negative numbers.
              time = (value % 864e5 + 864e5) % 864e5;
              // The hours, minutes, seconds, and milliseconds are obtained by
              // decomposing the time within the day. See section 15.9.1.10.
              hours = floor(time / 36e5) % 24;
              minutes = floor(time / 6e4) % 60;
              seconds = floor(time / 1e3) % 60;
              milliseconds = time % 1e3;
            };
          } else {
            getData = function (value) {
              year = value.getUTCFullYear();
              month = value.getUTCMonth();
              date = value.getUTCDate();
              hours = value.getUTCHours();
              minutes = value.getUTCMinutes();
              seconds = value.getUTCSeconds();
              milliseconds = value.getUTCMilliseconds();
            };
          }
          serializeDate = function (value) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              getData(value);
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
              "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
              // Months, dates, hours, minutes, and seconds should have two
              // digits; milliseconds should have three.
              "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
              // Milliseconds are optional in ES 5.0, but required in 5.1.
              "." + toPaddedString(3, milliseconds) + "Z";
              year = month = date = hours = minutes = seconds = milliseconds = null;
            } else {
              value = null;
            }
            return value;
          };
          return serializeDate(value);
        };

        // For environments with `JSON.stringify` but buggy date serialization,
        // we override the native `Date#toJSON` implementation with a
        // spec-compliant one.
        if (has("json-stringify") && !has("date-serialization")) {
          // Internal: the `Date#toJSON` implementation used to override the native one.
          function dateToJSON (key) {
            return serializeDate(this);
          }

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          var nativeStringify = exports.stringify;
          exports.stringify = function (source, filter, width) {
            var nativeToJSON = Date.prototype.toJSON;
            Date.prototype.toJSON = dateToJSON;
            var result = nativeStringify(source, filter, width);
            Date.prototype.toJSON = nativeToJSON;
            return result;
          }
        } else {
          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var escapeChar = function (character) {
            var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
            if (escaped) {
              return escaped;
            }
            return unicodePrefix + toPaddedString(2, charCode.toString(16));
          };
          var reEscape = /[\x00-\x1f\x22\x5c]/g;
          var quote = function (value) {
            reEscape.lastIndex = 0;
            return '"' +
              (
                reEscape.test(value)
                  ? value.replace(reEscape, escapeChar)
                  : value
              ) +
              '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
            var value, type, className, results, element, index, length, prefix, result;
            attempt(function () {
              // Necessary for host object support.
              value = object[property];
            });
            if (typeof value == "object" && value) {
              if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                value = serializeDate(value);
              } else if (typeof value.toJSON == "function") {
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            // Exit early if value is `undefined` or `null`.
            if (value == undefined) {
              return value === undefined ? value : "null";
            }
            type = typeof value;
            // Only call `getClass` if the value is an object.
            if (type == "object") {
              className = getClass.call(value);
            }
            switch (className || type) {
              case "boolean":
              case booleanClass:
                // Booleans are represented literally.
                return "" + value;
              case "number":
              case numberClass:
                // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                // `"null"`.
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              case "string":
              case stringClass:
                // Strings are double-quoted and escaped.
                return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undefined ? "null" : element);
                }
                result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forOwn(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undefined) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter] && filter) {
              className = getClass.call(filter);
              if (className == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length;) {
                  value = filter[index++];
                  className = getClass.call(value);
                  if (className == "[object String]" || className == "[object Number]") {
                    properties[value] = 1;
                  }
                }
              }
            }
            if (width) {
              className = getClass.call(width);
              if (className == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  if (width > 10) {
                    width = 10;
                  }
                  for (whitespace = ""; whitespace.length < width;) {
                    whitespace += " ";
                  }
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                var temp = source.slice(Index, Index + 4);
                if (temp == "true") {
                  Index += 4;
                  return true;
                } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
                  Index += 5;
                  return false;
                } else if (temp == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;;) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;;) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undefined) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forOwn` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(getClass, forOwn, value, length, callback);
              }
            } else {
              forOwn(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports.runInContext = runInContext;
    return exports;
  }


  // Export for web browsers and JavaScript engines.
  var nativeJSON = root.JSON,
      previousJSON = root.JSON3,
      isRestored = false;

  var JSON3 = runInContext(root, (root.JSON3 = {
    // Public: Restores the original value of the global `JSON` object and
    // returns a reference to the `JSON3` object.
    "noConflict": function () {
      if (!isRestored) {
        isRestored = true;
        root.JSON = nativeJSON;
        root.JSON3 = previousJSON;
        nativeJSON = previousJSON = null;
      }
      return JSON3;
    }
  }));

  root.JSON = {
    "parse": JSON3.parse,
    "stringify": JSON3.stringify
  };

}).call(this);;

// https://github.com/MaxArt2501/base64-js/blob/master/base64.js

(function (root, factory) {
  factory(root);
})(window, function(root) {
  if (root.atob) {
      // Some browsers' implementation of atob doesn't support whitespaces
      // in the encoded string (notably, IE). This wraps the native atob
      // in a function that strips the whitespaces.
      // The original function can be retrieved in atob.original
      try {
          root.atob(" ");
      } catch(e) {
          root.atob = (function(atob) {
              var func = function(string) {
                  return atob(String(string).replace(/[\t\n\f\r ]+/g, ""));
              };
              func.original = atob;
              return func;
          })(root.atob);
      }
      return;
  }

      // base64 character set, plus padding character (=)
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      // Regular expression to check formal correctness of base64 encoded strings
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

  root.btoa = function(string) {
      string = String(string);
      var bitmap, a, b, c,
          result = "", i = 0,
          rest = string.length % 3; // To determine the final padding

      for (; i < string.length;) {
          if ((a = string.charCodeAt(i++)) > 255
                  || (b = string.charCodeAt(i++)) > 255
                  || (c = string.charCodeAt(i++)) > 255)
              sd.log("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");

          bitmap = (a << 16) | (b << 8) | c;
          result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63)
                  + b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }

      // If there's need of padding, replace the last 'A's with equal signs
      return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
  };

  root.atob = function(string) {
      // atob can work with strings with whitespaces, even inside the encoded part,
      // but only \t, \n, \f, \r and ' ', which can be stripped.
      string = String(string).replace(/[\t\n\f\r ]+/g, "");
      if (!b64re.test(string))
          sd.log("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");

      // Adding the padding if missing, for semplicity
      string += "==".slice(2 - (string.length & 3));
      var bitmap, result = "", r1, r2, i = 0;
      for (; i < string.length;) {
          bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
                  | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

          result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
                  : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
                  : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
      }
      return result;
  };
});;

/*
一系列的通用的方法
*/

//polyfill
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function(str, newStr){
    if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
      return this.replace(str, newStr);
    }
    return this.replace(new RegExp(str, 'g'), newStr);
  };
}

(function () {
  var ArrayProto = Array.prototype;
  var FuncProto = Function.prototype;
  var ObjProto = Object.prototype;
  var slice = ArrayProto.slice;
  var toString = ObjProto.toString;
  var hasOwnProperty = ObjProto.hasOwnProperty;
  var nativeBind = FuncProto.bind;
  var nativeForEach = ArrayProto.forEach;
  var nativeIndexOf = ArrayProto.indexOf;
  var nativeIsArray = Array.isArray;
  var breaker = {};

  var each = (_.each = function (obj, iterator, context) {
    if (obj == null) {
      return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isArray(obj) && obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
          return false;
        }
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return false;
          }
        }
      }
    }
  });

  _.map = function (obj, iterator) {
    var results = [];
    // Not using strict equality so that this acts as a
    // shortcut to checking for `null` and `undefined`.
    if (obj == null) {
      return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) {
      return obj.map(iterator);
    }
    each(obj, function (value, index, list) {
      results.push(iterator(value, index, list));
    });
    return results;
  };

  // 普通的extend，不能到二级
  _.extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (hasOwnProperty.call(source, prop) && source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // 允许二级的extend
  _.extend2Lev = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (_.isObject(source[prop]) && _.isObject(obj[prop])) {
            _.extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  };
  // 如果已经有的属性不覆盖,如果没有的属性加进来
  _.coverExtend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  _.isArray =
    nativeIsArray ||
    function (obj) {
      return toString.call(obj) === '[object Array]';
    };

  _.isFunction = function (f) {
    if (!f) {
      return false;
    }
    try {
      return /^\s*\bfunction\b/.test(f);
    } catch (x) {
      return false;
    }
  };

  _.isArguments = function (obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  _.toArray = function (iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (_.isArray(iterable)) {
      return slice.call(iterable);
    }
    if (_.isArguments(iterable)) {
      return slice.call(iterable);
    }
    return _.values(iterable);
  };

  _.values = function (obj) {
    var results = [];
    if (obj == null) {
      return results;
    }
    each(obj, function (value) {
      results[results.length] = value;
    });
    return results;
  };

  _.indexOf = function (arr, target) {
    var indexof = arr.indexOf;
    if (indexof) {
      return indexof.call(arr, target);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
          return i;
        }
      }
      return -1;
    }
  };

  _.hasAttributes = function (ele, attrs) {
    if (typeof attrs === 'string') {
      return _.hasAttribute(ele, attrs);
    } else if (_.isArray(attrs)) {
      var result = false;
      for (var i = 0; i < attrs.length; i++) {
        var testResult = _.hasAttribute(ele, attrs[i]);
        if (testResult) {
          result = true;
          break;
        }
      }
      return result;
    }
  };

  _.hasAttribute = function (ele, attr) {
    if (ele.hasAttribute) {
      return ele.hasAttribute(attr);
    } else {
      return !!(ele.attributes[attr] && ele.attributes[attr].specified);
    }
  };

  _.filter = function (arr, fn, self) {
    var hasOwn = Object.prototype.hasOwnProperty;
    if (arr.filter) {
      return arr.filter(fn);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i)) {
        continue;
      }
      var val = arr[i];
      if (fn.call(self, val, i, arr)) {
        ret.push(val);
      }
    }
    return ret;
  };

  _.inherit = function (subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  };

  _.trim = function (str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  _.isObject = function (obj) {
    if (obj == null) {
      return false;
    } else {
      return toString.call(obj) == '[object Object]';
    }
  };

  _.isEmptyObject = function (obj) {
    if (_.isObject(obj)) {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  _.isUndefined = function (obj) {
    return obj === void 0;
  };

  _.isString = function (obj) {
    return toString.call(obj) == '[object String]';
  };

  _.isDate = function (obj) {
    return toString.call(obj) == '[object Date]';
  };

  _.isBoolean = function (obj) {
    return toString.call(obj) == '[object Boolean]';
  };

  _.isNumber = function (obj) {
    return toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj));
  };

  _.isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };

  _.isJSONString = function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  _.safeJSONParse = function (str) {
    var val = null;
    try {
      val = JSON.parse(str);
    } catch (e) {
      return false;
    }
    return val;
  };
  // gbk等编码decode会异常
  _.decodeURIComponent = function (val) {
    var result = val;
    try {
      result = decodeURIComponent(val);
    } catch (e) {
      result = val;
    }
    return result;
  };

  // decodeURI 解码
  _.decodeURI = function (val) {
    var result = val;
    try {
      result = decodeURI(val);
    } catch (e) {
      result = val;
    }
    return result;
  };

  // decodeURI 解码
  _.isDecodeURI = function (para, val) {
    if (para) {
      return _.decodeURI(val);
    } else {
      return val;
    }
  };

  _.encodeDates = function (obj) {
    _.each(obj, function (v, k) {
      if (_.isDate(v)) {
        obj[k] = _.formatDate(v);
      } else if (_.isObject(v)) {
        obj[k] = _.encodeDates(v); // recurse
      }
    });
    return obj;
  };

  _.mediaQueriesSupported = function () {
    return typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined';
  };

  // Returns current screen orientation type
  // Possible values: ['未取到值', 'landscape', 'portrait']
  // Defaults to '未取到值'.
  // Tested on
  // * IE 6 => '未取到值'
  // * Opera 15 on macOS
  // * Firefox 68 on macOS
  // * Safari 12.1 on macOS
  // * Chrome 75 on macOS
  // * Safari on iPhone X
  // * Chrome on Google Pixel 2
  _.getScreenOrientation = function () {
    // Screen Orientation API
    var screenOrientationAPI = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
    var screenOrientation = '未取到值';
    if (screenOrientationAPI) {
      screenOrientation = screenOrientationAPI.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
    } else if (_.mediaQueriesSupported()) {
      // matchMedia
      var matchMediaFunc = window.matchMedia || window.msMatchMedia;
      if (matchMediaFunc('(orientation: landscape)').matches) {
        screenOrientation = 'landscape';
      } else if (matchMediaFunc('(orientation: portrait)').matches) {
        screenOrientation = 'portrait';
      }
    }
    return screenOrientation;
  };

  _.now =
    Date.now ||
    function () {
      return new Date().getTime();
    };

  _.throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  _.hashCode = function (str) {
    if (typeof str !== 'string') {
      return 0;
    }
    var hash = 0;
    var char = null;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  };

  _.formatDate = function (d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' + pad(d.getMilliseconds());
  };

  _.getRandomBasic = (function(){
    var today = new Date();
    var seed = today.getTime();
    function rnd(){
      seed = ( seed * 9301 + 49297 ) % 233280;
      return seed / ( 233280.0 );
    };
    return function rand(number){
      return Math.ceil(rnd(seed) * number);
    };
  })();
  // 返回
  _.getRandom = function(){
    if(typeof Uint32Array === 'function'){
      var cry = '';
      if(typeof crypto !== 'undefined'){
        cry = crypto;
      }else if(typeof msCrypto !== 'undefined'){
        cry = msCrypto;
      }
      if(_.isObject(cry) && cry.getRandomValues){
        var typedArray = new Uint32Array(1);
        var randomNumber = cry.getRandomValues(typedArray)[0];
        var integerLimit = Math.pow(2, 32);
        return randomNumber / integerLimit;      
      }
    }
    return _.getRandomBasic(10000000000000000000)/10000000000000000000;
  };

  // 把日期格式全部转化成日期字符串
  _.searchObjDate = function (o) {
    if (_.isObject(o)) {
      _.each(o, function (a, b) {
        if (_.isObject(a)) {
          _.searchObjDate(o[b]);
        } else {
          if (_.isDate(a)) {
            o[b] = _.formatDate(a);
          }
        }
      });
    }
  };

  _.searchZZAppStyle = function (data) {
    if (typeof data.properties.$project !== 'undefined') {
      data.project = data.properties.$project;
      delete data.properties.$project;
    }
    if (typeof data.properties.$token !== 'undefined') {
      data.token = data.properties.$token;
      delete data.properties.$token;
    }
  };

  _.formatJsonString = function (obj) {
    try {
      return JSON.stringify(obj, null, '  ');
    } catch (e) {
      return JSON.stringify(obj);
    }
  };

  // 把字符串格式数据限制字符串长度
  _.formatString = function (str, maxLen) {
    if (_.isNumber(maxLen) && str.length > maxLen) {
      sd.log('字符串长度超过限制，已经做截取--' + str);
      return str.slice(0, maxLen);
    } else {
      return str;
    }
  };

  // 把字符串格式数据限制字符串长度
  _.searchObjString = function (o) {
    if (_.isObject(o)) {
      _.each(o, function (a, b) {
        if (_.isObject(a)) {
          _.searchObjString(o[b]);
        } else {
          if (_.isString(a)) {
            o[b] = _.formatString(a, b === '$element_selector' ? 1024 : sd.para.max_string_length);
          }
        }
      });
    }
  };

  /**
   * 执行属性中的函数，并且过滤掉不符合条件的属性
   *
   * @param {Object} obj - Properties.
   *
   */
  _.parseSuperProperties = function (data) {
    var obj = data.properties;
    var copyData = JSON.parse(JSON.stringify(data));
    if (_.isObject(obj)) {
      _.each(obj, function (value, key) {
        if (_.isFunction(value)) {
          try {
            obj[key] = value(copyData);
            if (_.isFunction(obj[key])) {
              sd.log('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
              delete obj[key];
            }
          } catch (e) {
            delete obj[key];
            sd.log('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
          }
        }
      });
      _.strip_sa_properties(obj);
    }
  };

  /**
   * @description 过滤掉事件的属性名为保留字段的属性
   * @param {object} obj 属性对象
   */
  _.filterReservedProperties = function (obj) {
    var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
    if (!_.isObject(obj)) {
      return;
    }
    _.each(reservedFields, function (key, index) {
      if (!(key in obj)) {
        return;
      }
      if (index < 3) {
        delete obj[key];
        sd.log('您的属性- ' + key + '是保留字段，我们已经将其删除');
      } else {
        sd.log('您的属性- ' + key + '是保留字段，请避免其作为属性名');
      }
    });
  };

  // 去除$option的配置数据
  _.searchConfigData = function (data) {
    if (typeof data === 'object' && data.$option) {
      var data_config = data.$option;
      delete data.$option;
      return data_config;
    } else {
      return {};
    }
  };

  // 数组去重复
  _.unique = function (ar) {
    var temp,
      n = [],
      o = {};
    for (var i = 0; i < ar.length; i++) {
      temp = ar[i];
      if (!(temp in o)) {
        o[temp] = true;
        n.push(temp);
      }
    }
    return n;
  };

  // 只能是sensors满足的数据格式
  _.strip_sa_properties = function (p) {
    if (!_.isObject(p)) {
      return p;
    }
    _.each(p, function (v, k) {
      // 如果是数组，把值自动转换成string
      if (_.isArray(v)) {
        var temp = [];
        _.each(v, function (arrv) {
          if (_.isString(arrv)) {
            temp.push(arrv);
          } else {
            sd.log('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        p[k] = temp;
      }
      // 只能是字符串，数字，日期,布尔，数组
      if (!(_.isString(v) || _.isNumber(v) || _.isDate(v) || _.isBoolean(v) || _.isArray(v) || _.isFunction(v) || k === '$option')) {
        sd.log('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  };

  // 去掉undefined和null
  _.strip_empty_properties = function (p) {
    var ret = {};
    _.each(p, function (v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  };

  /**
   * Create a base-64 encoded ASCII string from a UTF-8 string.
   */
  _.base64Encode = function (data) {
    return btoa(
      encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
      })
    );
  };

  _.base64Decode = function (data) {
    var arr = _.map(atob(data).split(''), function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    });
    return decodeURIComponent(arr.join(''));
  };

  _.UUID = (function () {
    var T = function () {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function () {
      return _.getRandom().toString(16).replace('.', '');
    };
    var UA = function (n) {
      var ua = navigator.userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

      function xor(result, byte_array) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function () {
      // 有些浏览器取个屏幕宽度都异常...
      var se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
      } else {
        se = String(_.getRandom() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }
      var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
      if (val) {
        return val;
      } else {
        return (String(_.getRandom()) + String(_.getRandom()) + String(_.getRandom())).slice(2, 15);
      }
    };
  })();

  _.getQueryParam = function (url, param) {
    param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    url = _.decodeURIComponent(url);
    var regexS = '[\\?&]' + param + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
      return '';
    } else {
      return _.decodeURIComponent(results[1]);
    }
  };

  _.urlParse = function (para) {
    var URLParser = function (a) {
      this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Path: 8,
        URL: 0,
        QueryString: 9,
        Fragment: 10
      };
      this._values = {};
      this._regex = null;
      this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

      if (typeof a != 'undefined') {
        this._parse(a);
      }
    };
    URLParser.prototype.setUrl = function (a) {
      this._parse(a);
    };
    URLParser.prototype._initValues = function () {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };
    URLParser.prototype.addQueryString = function (queryObj) {
      if (typeof queryObj !== 'object') {
        return false;
      }
      var query = this._values.QueryString || '';
      for (var i in queryObj) {
        if (new RegExp(i + '[^&]+').test(query)) {
          query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
        } else {
          if (query.slice(-1) === '&') {
            query = query + i + '=' + queryObj[i];
          } else {
            if (query === '') {
              query = i + '=' + queryObj[i];
            } else {
              query = query + '&' + i + '=' + queryObj[i];
            }
          }
        }
      }
      this._values.QueryString = query;
    };
    URLParser.prototype.getUrl = function () {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype.getUrl = function () {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      return url;
    };
    URLParser.prototype._parse = function (a) {
      this._initValues();
      var b = this._regex.exec(a);
      if (!b) {
        sd.log('DPURLParser::_parse -> Invalid URL');
      }
      for (var c in this._fields) {
        if (typeof b[this._fields[c]] != 'undefined') {
          this._values[c] = b[this._fields[c]];
        }
      }
      this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
      this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
    };
    return new URLParser(para);
  };

  /* ulr预置
_.referringDomain = function(referrer) {
  var split = referrer.split('/');
  if (split.length >= 3) {
    return split[2];
  }
  return '';
};

_.getDomainByHost = function(url) {
  if (typeof url === 'string' && url.split('.').length >= 2) {
    var temp = url.match(/[^\.]+\.[^.]+$/);
    if (temp && temp[0]) {
      return temp[0];
    } else {
      return '';
    }
  } else {
    return '';
  }
}
*/

  /* _.draggable = function(elementToDrag, event) {
  function getScrollOffsets() {
    var w = document;
    if (w.pageXOffset != null) {
      return {
        x: w.pageXOffset,
        y: w.pageYOffset
      };
    } else {
      return {
        x: w.documentElement.scrollLeft,
        y: w.documentElement.scrollTop
      };
    }
  }

  var scroll = getScrollOffsets();
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  } else if (document.attachEvent) {
    document.attachEvent("onmousemove", moveHandler);
    document.attachEvent("onmouseup", upHandler);
  }
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;

  elementToDrag.style.bottom = 'auto';

  function moveHandler(e) {
    e = e || window.event;
    var scroll = getScrollOffsets();
    elementToDrag.style.left = (e.clientX + scroll.x - deltaX) + "px";
    elementToDrag.style.top = (e.clientY + scroll.y - deltaY) + "px";
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
  function upHandler(e) {
    if (!e) e = window.event;
    if (document.removeEventListener) {
      document.removeEventListener("mouseup", upHandler);
      document.removeEventListener("mousemove", moveHandler);
    } else if (document.detachEvent) {
      document.detachEvent("onmouseup", upHandler);
      document.detachEvent("onmousemove", moveHandler);
    }
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
} */

  // 是否有标准的浏览器环境,如果不是发送$errorEnviroment:{$errorReson:'没有window'}
  /* _.hasStandardBrowserEnviroment = function() {
  if (!window) {
    return 'window';
  }
  if (!document) {
    return 'document';
  }
  if (!navigator) {
    return 'navigator';
  }
  if (!screen) {
    return 'screen';
  }

}; */

  /* _.bindReady = function(fn,win) {
  win = win || window;
  var done = false,
  top = true,
  doc = win.document,
  root = doc.documentElement,
  modern = doc.addEventListener,
  add = modern ? 'addEventListener' : 'attachEvent',
  rem = modern ? 'removeEventListener' : 'detachEvent',
  pre = modern ? '' : 'on',
  init = function(e) {
    if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
    (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) fn.call(win, e.type || e);
  },
  poll = function() {
    try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
    init('poll');
  };

  if (doc.readyState == 'complete') fn.call(win, 'lazy');
  else {
    if (!modern && root.doScroll) {
      try { top = !win.frameElement; } catch(e) { }
      if (top) poll();
    }
    doc[add](pre + 'DOMContentLoaded', init, false);
    doc[add](pre + 'readystatechange', init, false);
    win[add](pre + 'load', init, false);
  }

}; */

  _.addEvent = function () {
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        event._getPath = fixEvent._getPath;
      }
      return event;
    }
    fixEvent._getPath = function () {
      var ev = this;
      var polyfill = function () {
        try {
          var element = ev.target;
          var pathArr = [element];
          if (element === null || element.parentElement === null) {
            return [];
          }
          while (element.parentElement !== null) {
            element = element.parentElement;
            pathArr.unshift(element);
          }
          return pathArr;
        } catch (err) {
          return [];
        }
      };
      return this.path || (this.composedPath && this.composedPath()) || polyfill();
    };
    fixEvent.preventDefault = function () {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function () {
      this.cancelBubble = true;
    };

    var register_event = function (element, type, handler) {
      var useCapture = _.isObject(sd.para.heatmap) && sd.para.heatmap.useCapture ? true : false;
      if (_.isObject(sd.para.heatmap) && typeof sd.para.heatmap.useCapture === 'undefined' && type === 'click') {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function (e) {
            e._getPath = fixEvent._getPath;
            handler.call(this, e);
          },
          useCapture
        );
      } else {
        var ontype = 'on' + type;
        var old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler);
      }
    };
    function makeHandler(element, new_handler, old_handlers) {
      var handler = function (event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return undefined;
        }
        event.target = event.srcElement;

        var ret = true;
        var old_result, new_result;
        if (typeof old_handlers === 'function') {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        if (false === old_result || false === new_result) {
          ret = false;
        }
        return ret;
      };
      return handler;
    }

    register_event.apply(null, arguments);
  };

  _.addHashEvent = function (callback) {
    var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
    _.addEvent(window, hashEvent, callback);
  };

  _.addSinglePageEvent = function (callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    //调用方法导致的url切换
    window.history.pushState = function () {
      historyPushState.apply(window.history, arguments);
      callback(current_url);
      current_url = location.href;
    };
    window.history.replaceState = function () {
      historyReplaceState.apply(window.history, arguments);
      callback(current_url);
      current_url = location.href;
    };

    // 前进后退导致的url切换
    var singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
    _.addEvent(window, singlePageEvent, function () {
      callback(current_url);
      current_url = location.href;
    });
  };

  _.cookie = {
    get: function (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return _.decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function (name, value, days, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
      var cdomain = '',
        expires = '',
        secure = '';
      days = days == null ? 73000 : days;

      if (cross_subdomain) {
        var domain = _.getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      // 0 session
      // -1 马上过期
      //
      if (days !== 0) {
        var date = new Date();
        // 默认是天，可以是秒
        if (String(days).slice(-1) === 's') {
          date.setTime(date.getTime() + Number(String(days).slice(0, -1)) * 1000);
        } else {
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        }

        expires = '; expires=' + date.toGMTString();
      }
      if (sd.para.is_secure_cookie) {
        secure = '; secure';
      }

      function getValid(data) {
        if (data) {
          return data.replaceAll(/\r\n/g,'');
        } else {
          return false;
        }
      }
      var valid_name = '';
      var valid_value = '';
      var valid_domain = '';
      if (name) {
        valid_name = getValid(name);
      }
      if (value) {
        valid_value = getValid(value);
      }
      if (cdomain) {
        valid_domain = getValid(cdomain);
      }
      if (valid_name && valid_value) {
        document.cookie = valid_name + '=' + encodeURIComponent(valid_value) + expires + '; path=/' + valid_domain + secure;
      }
      
    },
    encrypt: function (v) {
      return 'data:enc;' + _.rot13obfs(v);
    },
    decrypt: function (v) {
      v = v.substring('data:enc;'.length);
      v = _.rot13defs(v);
      return v;
    },
    resolveValue: function (cross) {
      var flag = 'data:enc;';
      if (_.isString(cross) && cross.indexOf(flag) === 0) {
        cross = _.cookie.decrypt(cross);
      }
      return cross;
    },

    remove: function (name, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sd.para.cross_subdomain : cross_subdomain;
      _.cookie.set(name, '', -1, cross_subdomain);
    },

    getCookieName: function (name_prefix, url) {
      var sub = '';
      url = url || location.href;
      if (sd.para.cross_subdomain === false) {
        try {
          sub = _.URL(url).hostname;
        } catch (e) {
          sd.log(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sajssdk_2015_' + name_prefix + '_' + sub.replace(/\./g, '_');
        } else {
          sub = 'sajssdk_2015_root_' + name_prefix;
        }
      } else {
        sub = 'sajssdk_2015_cross_' + name_prefix;
      }
      return sub;
    },
    // 针对新用户的兼容性判断,兼容子域名
    getNewUser: function () {
      var prefix = 'new_user';
      if (this.get('sensorsdata_is_new_user') !== null || this.get(this.getCookieName(prefix)) !== null) {
        return true;
      } else {
        return false;
      }
    }
  };
  _.getElementContent = function (target, tagName) {
    var textContent = '';
    var element_content = '';
    if (target.textContent) {
      textContent = _.trim(target.textContent);
    } else if (target.innerText) {
      textContent = _.trim(target.innerText);
    }
    if (textContent) {
      textContent = textContent
        .replace(/[\r\n]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .substring(0, 255);
    }
    element_content = textContent || '';

    // 针对inut默认只采集button和submit非名感的词汇。可以自定义（银联提）
    if (tagName === 'input' || tagName === 'INPUT') {
      if (target.type === 'button' || target.type === 'submit') {
        element_content = target.value || '';
      } else if (sd.para.heatmap && typeof sd.para.heatmap.collect_input === 'function' && sd.para.heatmap.collect_input(target)) {
        element_content = target.value || '';
      }
    }
    return element_content;
  };
  // 获取元素的一些信息
  _.getEleInfo = function (obj) {
    if (!obj.target) {
      return false;
    }

    var target = obj.target;
    var tagName = target.tagName.toLowerCase();

    var props = {};

    props.$element_type = tagName;
    props.$element_name = target.getAttribute('name');
    props.$element_id = target.getAttribute('id');
    props.$element_class_name = typeof target.className === 'string' ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = _.getElementContent(target, tagName);

    props = _.strip_empty_properties(props);

    (props.$url = _.isDecodeURI(sd.para.url_is_decode, location.href)), (props.$url_path = location.pathname);
    props.$title = document.title;
    props.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;

    return props;
  };

  // _.localStorage
  _.localStorage = {
    get: function (name) {
      return window.localStorage.getItem(name);
    },

    parse: function (name) {
      var storedValue;
      try {
        storedValue = JSON.parse(_.localStorage.get(name)) || null;
      } catch (err) {
        sd.log(err);
      }
      return storedValue;
    },

    set: function (name, value) {
      window.localStorage.setItem(name, value);
    },

    remove: function (name) {
      window.localStorage.removeItem(name);
    },

    isSupport: function () {
      var supported = true;
      try {
        var supportName = '__sensorsdatasupport__';
        var val = 'testIsSupportStorage';
        _.localStorage.set(supportName, val);
        if (_.localStorage.get(supportName) !== val) {
          supported = false;
        }
        _.localStorage.remove(supportName);
      } catch (err) {
        supported = false;
      }
      return supported;
    }
  };

  _.sessionStorage = {
    isSupport: function () {
      var supported = true;

      var supportName = '__sensorsdatasupport__';
      var val = 'testIsSupportStorage';
      try {
        if (sessionStorage && sessionStorage.setItem) {
          sessionStorage.setItem(supportName, val);
          sessionStorage.removeItem(supportName, val);
          supported = true;
        } else {
          supported = false;
        }
      } catch (e) {
        supported = false;
      }
      return supported;
    }
  };

  // 检测是否支持跨域的ajax发送
  _.isSupportCors = function () {
    if (typeof window.XMLHttpRequest === 'undefined') {
      return false;
    }
    //Detect browser support for CORS
    if ('withCredentials' in new XMLHttpRequest()) {
      /* supports cross-domain requests */
      return true;
    } else if (typeof XDomainRequest !== 'undefined') {
      //Use IE-specific "CORS" code with XDR
      return true;
    } else {
      //Time to retreat with a fallback or polyfill
      return false;
    }
  };

  _.xhr = function (cors) {
    if (cors) {
      if (typeof window.XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest()) {
        return new XMLHttpRequest();
      } else if (typeof XDomainRequest !== 'undefined') {
        return new XDomainRequest();
      } else {
        return null;
      }
    } else {
      if (typeof window.XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (d) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (d) {
            sd.log(d);
          }
        }
      }
    }
  };

  _.ajax = function (para) {
    para.timeout = para.timeout || 20000;

    para.credentials = typeof para.credentials === 'undefined' ? true : para.credentials;
    function getJSON(data) {
      if (!data) {
        return '';
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }

    var g = _.xhr(para.cors);

    if (!g) {
      return false;
    }

    if (!para.type) {
      para.type = para.data ? 'POST' : 'GET';
    }
    para = _.extend(
      {
        success: function () {},
        error: function () {}
      },
      para
    );

    //校验url与location.href协议是否一致
    sd.debug.protocol.ajax(para.url);

    var oldsuccess = para.success;
    var olderror = para.error;
    var errorTimer;

    function abort() {
      try {
        if (_.isObject(g) && g.abort) {
          g.abort();
        }
      } catch (error) {
        sd.log(error);
      }

      //如果 g.abort 未生效，手动执行 error
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
        para.error && para.error();
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      }
    }

    para.success = function (data) {
      oldsuccess(data);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    para.error = function (err) {
      olderror(err);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    errorTimer = setTimeout(function () {
      abort();
    }, para.timeout);

    if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
      //XDomainRequest success callback
      g.onload = function () {
        para.success && para.success(getJSON(g.responseText));
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      };
      //XDomainRequest error callback
      g.onerror = function () {
        para.error && para.error(getJSON(g.responseText), g.status);
        g.onreadystatechange = null;
        g.onerror = null;
        g.onload = null;
      };
    }
    g.onreadystatechange = function () {
      try {
        if (g.readyState == 4) {
          if ((g.status >= 200 && g.status < 300) || g.status == 304) {
            para.success(getJSON(g.responseText));
          } else {
            para.error(getJSON(g.responseText), g.status);
          }
          g.onreadystatechange = null;
          g.onload = null;
        }
      } catch (e) {
        g.onreadystatechange = null;
        g.onload = null;
      }
    };

    g.open(para.type, para.url, true);

    try {
      if (para.credentials) {
        g.withCredentials = true;
      }
      if (_.isObject(para.header)) {
        _.each(para.header, function (v, i) {
          g.setRequestHeader && g.setRequestHeader(i, v);
        });
      }

      if (para.data) {
        if (!para.cors) {
          //XDomainRequest no custom headers may be aadded to the request
          g.setRequestHeader && g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        if (para.contentType === 'application/json') {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        } else {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
      }
    } catch (e) {
      sd.log(e);
    }
    console.log(para.data)
    alert(para.data)
    g.send(para.data || null);
  };

  _.loadScript = function (para) {
    para = _.extend(
      {
        success: function () {},
        error: function () {},
        appendCall: function (g) {
          document.getElementsByTagName('head')[0].appendChild(g);
        }
      },
      para
    );

    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.setAttribute('charset', 'UTF-8');
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function () {
      para.error();
      g.onerror = null;
    };
    // if iframe
    para.appendCall(g);
  };

  _.getHostname = function (url, defaultValue) {
    if (!defaultValue || typeof defaultValue !== 'string') {
      defaultValue = 'hostname解析异常';
    }
    var hostname = null;
    try {
      hostname = _.URL(url).hostname;
    } catch (e) {
      sd.log('getHostname传入的url参数不合法！');
    }
    return hostname || defaultValue;
  };

  _.getQueryParamsFromUrl = function (url) {
    var result = {};
    var arr = url.split('?');
    var queryString = arr[1] || '';
    if (queryString) {
      result = _.getURLSearchParams('?' + queryString);
    }
    return result;
  };

  /**
   * 查询得到URL参数
   * @param {string} queryString - 以问号开头的 query string
   * @return {Object} 一个含有参数列表的key/value对象
   *
   * @example
   * var url = _.getURLSearchParams('?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.project; // => testproject
   */
  _.getURLSearchParams = function (queryString) {
    queryString = queryString || '';
    var decodeParam = function (str) {
      return decodeURIComponent(str);
    };
    var args = {}; // Start with an empty object
    var query = queryString.substring(1); // Get query string, minus '?'
    var pairs = query.split('&'); // Split at ampersands
    for (var i = 0; i < pairs.length; i++) {
      // For each fragment
      var pos = pairs[i].indexOf('='); // Look for "name=value"
      if (pos === -1) continue; // If not found, skip it
      var name = pairs[i].substring(0, pos); // Extract the name
      var value = pairs[i].substring(pos + 1); // Extract the value
      name = decodeParam(name); // Decode the name
      value = decodeParam(value); // Decode the value
      args[name] = value; // Store as a property
    }
    return args; // Return the parsed arguments
  };

  /**
   * 解析URL
   * @param {string} url
   * @return {Object} 一个 URL 对象或者普通JS对象
   *
   * @example
   * var url = _.URL('http://www.domain.com:8080/path/index.html?project=testproject&query1=test&silly=willy&field[0]=zero&field[2]=two#test=hash&chucky=cheese');
   *
   * url.hostname; // => www.domain.com
   * url.searchParams.get('project'); // => testproject
   */
  _.URL = function (url) {
    var result = {};
    var basicProps = ['hash', 'host', 'hostname', 'href', 'origin', 'password', 'pathname', 'port', 'protocol', 'search', 'username'];
    // Some browsers allow objects to be created via URL constructor, but instances do not have the expected url properties.
    // See https://www.caniuse.com/#feat=url
    var isURLAPIWorking = function () {
      var url;
      try {
        url = new URL('http://modernizr.com/');
        return url.href === 'http://modernizr.com/';
      } catch (e) {
        return false;
      }
    };
    if (typeof window.URL === 'function' && isURLAPIWorking()) {
      result = new URL(url);
      if (!result.searchParams) {
        result.searchParams = (function () {
          var params = _.getURLSearchParams(result.search);
          return {
            get: function (searchParam) {
              return params[searchParam];
            }
          };
        })();
      }
    } else {
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(url) === false) {
        sd.log('Invalid URL');
      }
      var instance = _.urlParse(url);
      result.hash = '';
      result.host = instance._values.Host ? instance._values.Host + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.href = instance._values.URL;
      result.password = instance._values.Password;
      result.pathname = instance._values.Path;
      result.port = instance._values.Port;
      result.search = instance._values.QueryString ? '?' + instance._values.QueryString : '';
      result.username = instance._values.Username;
      result.hostname = instance._values.Hostname;
      result.protocol = instance._values.Protocol ? instance._values.Protocol + ':' : '';
      result.origin = instance._values.Origin ? instance._values.Origin + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.searchParams = (function () {
        var params = _.getURLSearchParams('?' + instance._values.QueryString);
        return {
          get: function (searchParam) {
            return params[searchParam];
          }
        };
      })();
    }
    return result;
  };

  _.getCurrentDomain = function (url) {
    var sdDomain = sd.para.current_domain;
    switch (typeof sdDomain) {
      case 'function':
        var resultDomain = sdDomain();
        if (resultDomain === '' || _.trim(resultDomain) === '') {
          return 'url解析失败';
        } else if (resultDomain.indexOf('.') !== -1) {
          return resultDomain;
        } else {
          return 'url解析失败';
        }
      case 'string':
        if (sdDomain === '' || _.trim(sdDomain) === '') {
          return 'url解析失败';
        } else if (sdDomain.indexOf('.') !== -1) {
          return sdDomain;
        } else {
          return 'url解析失败';
        }
      default:
        var cookieTopLevelDomain = _.getCookieTopLevelDomain();
        if (url === '') {
          return 'url解析失败';
        } else if (cookieTopLevelDomain === '') {
          return 'url解析失败';
        } else {
          return cookieTopLevelDomain;
        }
    }
  };

  _.getCookieTopLevelDomain = function (hostname) {
    hostname = hostname || location.hostname;
    function validHostname(value) {
      if (value) {
        return value;
      } else {
        return false;
      }
    }
    var new_hostname = validHostname(hostname);
    if (!new_hostname) {
      return '';
    }
    var splitResult = new_hostname.split('.');
    if (_.isArray(splitResult) && splitResult.length >= 2 && !/^(\d+\.)+\d+$/.test(new_hostname)) {
      var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
      while (splitResult.length > 0) {
        domainStr = '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
        document.cookie = 'sensorsdata_domain_test=true; path=/; domain=' + domainStr;

        if (document.cookie.indexOf('sensorsdata_domain_test=true') !== -1) {
          var now = new Date();
          now.setTime(now.getTime() - 1000);

          document.cookie = 'sensorsdata_domain_test=true; expires=' + now.toGMTString() + '; path=/; domain=' + domainStr;

          return domainStr;
        }
      }
    }
    return '';
  };

  _.isReferralTraffic = function (refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return _.getCookieTopLevelDomain(_.getHostname(refererstring)) !== _.getCookieTopLevelDomain();
  };

  _.ry = function (dom) {
    return new _.ry.init(dom);
  };
  _.ry.init = function (dom) {
    this.ele = dom;
  };
  _.ry.init.prototype = {
    addClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
      }
      return this;
    },
    hasClass: function (para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function (key, value) {
      if (typeof key === 'string' && _.isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function () {
      var rect = this.ele.getBoundingClientRect();
      if (rect.width || rect.height) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    getSize: function () {
      if (!window.getComputedStyle) {
        return { width: this.ele.offsetWidth, height: this.ele.offsetHeight };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height };
      } catch (e) {
        return { width: 0, height: 0 };
      }
    },
    getStyle: function (value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
      }
    },
    wrap: function (elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return _.ry(ele);
    },
    getCssStyle: function (prop) {
      var result = this.ele.style.getPropertyValue(prop);
      if (result) {
        return result;
      }
      var rules = null;
      if (typeof window.getMatchedCSSRules === 'function') {
        rules = getMatchedCSSRules(this.ele);
      }
      if (!rules || !_.isArray(rules)) {
        return null;
      }
      for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
          return result;
        }
      }
    },
    sibling: function (cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function () {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function (elem) {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function (elem) {
      return this.siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function (elem) {
      return this.siblings(this.ele.firstChild);
    },
    parent: function () {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return _.ry(parent);
    },
    // 兼容不原生支持 previousElementSibling 的旧版浏览器
    previousElementSibling: function () {
      var el = this.ele;
      if ('previousElementSibling' in document.documentElement) {
        return _.ry(el.previousElementSibling);
      } else {
        while ((el = el.previousSibling)) {
          if (el.nodeType === 1) {
            return _.ry(el);
          }
        }
        return _.ry(null);
      }
    },
    // 得到和当前元素相同类型的同级元素
    getSameTypeSiblings: function () {
      var element = this.ele;
      var parentNode = element.parentNode;
      var tagName = element.tagName.toLowerCase();
      var arr = [];
      for (var i = 0; i < parentNode.children.length; i++) {
        var child = parentNode.children[i];
        if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
          arr.push(parentNode.children[i]);
        }
      }
      return arr;
    }
  };

  _.strToUnicode = function (str) {
    if (typeof str !== 'string') {
      sd.log('转换unicode错误', str);
      return str;
    }
    var nstr = '';
    for (var i = 0; i < str.length; i++) {
      nstr += '\\' + str.charCodeAt(i).toString(16);
    }
    return nstr;
  };

  /* _.querySelectorAll = function(val){

  if(typeof val !== 'string'){
    sd.log('选择器错误',val);
    return [];
  }
  // 替换纯数字的id
  var sp = val.split(' ');
  if(sp.length === 1){
    if(/^#\d+/.test(sp[0])){
      val = '#' + _.strToUnicode(sp[0].slice(1));
    }
  }else{
    if(/^#\d+/.test(sp[0])){
      sp[0] = '#' + _.strToUnicode(sp[0].slice(1));
      val = sp.join(' ');
    }
  }

  try{
     return document.querySelectorAll(val);
  }catch(e){
    sd.log('错误',val);
    return [];
  }
}; */

  _.getReferrer = function (referrer) {
    var referrer = referrer || document.referrer;
    if (typeof referrer !== 'string') {
      return '取值异常_referrer异常_' + String(referrer);
    }
    if (referrer.indexOf('https://www.baidu.com/') === 0) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sd.para.max_referrer_string_length);
    return typeof referrer === 'string' ? referrer : '';
  };

  _.getKeywordFromReferrer = function (referrerUrl) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sd.para.source_type.keyword;
    if (document && typeof referrerUrl === 'string') {
      if (referrerUrl.indexOf('http') === 0) {
        var searchEngine = _.getReferSearchEngine(referrerUrl);
        var query = _.getQueryParamsFromUrl(referrerUrl);
        if (_.isEmptyObject(query)) {
          return '未取到值';
        }
        var temp = null;
        for (var i in search_keyword) {
          if (searchEngine === i) {
            if (typeof query === 'object') {
              temp = search_keyword[i];
              if (_.isArray(temp)) {
                for (var i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    return _value;
                  }
                }
              } else if (query[temp]) {
                return query[temp];
              }
            }
          }
        }
        return '未取到值';
      } else {
        if (referrerUrl === '') {
          return '未取到值_直接打开';
        } else {
          return '未取到值_非http的url';
        }
      }
    } else {
      return '取值异常_referrer异常_' + String(referrerUrl);
    }
  };

  _.getWxAdIdFromUrl = function (url) {
    var click_id = _.getQueryParam(url, 'gdt_vid');
    var hash_key = _.getQueryParam(url, 'hash_key');
    var callbacks = _.getQueryParam(url, 'callbacks');
    var obj = {
      click_id: '',
      hash_key: '',
      callbacks: ''
    };
    if (_.isString(click_id) && click_id.length) {
      obj.click_id = click_id.length == 16 || click_id.length == 18 ? click_id : '参数解析不合法';

      //click_id 解析成功的情况下才会解析hashkey和callbacks
      if (_.isString(hash_key) && hash_key.length) {
        obj.hash_key = hash_key;
      }
      if (_.isString(callbacks) && callbacks.length) {
        obj.callbacks = callbacks;
      }
    }

    return obj;
  };

  _.getReferSearchEngine = function (referrerUrl) {
    var hostname = _.getHostname(referrerUrl);
    if (!hostname || hostname === 'hostname解析异常') {
      return '';
    }
    var search_keyword = sd.para.source_type.keyword;
    var searchEngineUrls = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/]
    };
    for (var prop in searchEngineUrls) {
      var urls = searchEngineUrls[prop];
      for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i].test(hostname)) {
          return prop;
        }
      }
    }
    return '未知搜索引擎';
  };

  _.getSourceFromReferrer = function () {
    function getMatchStrFromArr(arr, str) {
      for (var i = 0; i < arr.length; i++) {
        if (str.split('?')[0].indexOf(arr[i]) !== -1) {
          return true;
        }
      }
    }

    var utm_reg = '(' + sd.para.source_type.utm.join('|') + ')\\=[^&]+';
    var search_engine = sd.para.source_type.search;
    var social_engine = sd.para.source_type.social;

    var referrer = document.referrer || '';
    var url = _.info.pageProp.url;
    if (url) {
      var utm_match = url.match(new RegExp(utm_reg));
      if (utm_match && utm_match[0]) {
        return '付费广告流量';
      } else if (getMatchStrFromArr(search_engine, referrer)) {
        return '自然搜索流量';
      } else if (getMatchStrFromArr(social_engine, referrer)) {
        return '社交网站流量';
      } else if (referrer === '') {
        return '直接流量';
      } else {
        return '引荐流量';
      }
    } else {
      return '获取url异常';
    }
  };

  _.info = {
    initPage: function () {
      var referrer = _.getReferrer();
      var url = location.href;
      var url_domain = _.getCurrentDomain(url);
      if (!url_domain) {
        // TODO
        //_.jssdkDebug('url_domain异常_'+ url + '_' + url_domain);
        sd.debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
      }

      this.pageProp = {
        referrer: referrer,
        referrer_host: referrer ? _.getHostname(referrer) : '',
        url: url,
        url_host: _.getHostname(url, 'url_host取值异常'),
        url_domain: url_domain
      };
    },
    //当前页面的一些属性，在store初始化是生成
    pageProp: {},

    campaignParams: function () {
      var campaign_keywords = sd.source_channel_standard.split(' '),
        kw = '',
        params = {};
      if (_.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0) {
        campaign_keywords = campaign_keywords.concat(sd.para.source_channel);
        campaign_keywords = _.unique(campaign_keywords);
      }
      _.each(campaign_keywords, function (kwkey) {
        kw = _.getQueryParam(location.href, kwkey);
        if (kw.length) {
          params[kwkey] = kw;
        }
      });

      return params;
    },
    campaignParamsStandard: function (prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = _.info.campaignParams();
      var $utms = {},
        otherUtms = {};
      _.each(utms, function (v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms[prefix + i] = utms[i];
        } else {
          otherUtms[prefix_add + i] = utms[i];
        }
      });
      return {
        $utms: $utms,
        otherUtms: otherUtms
      };
    },
    // 预置属性
    properties: function () {
      return {
        $timezone_offset: new Date().getTimezoneOffset(),
        $screen_height: Number(screen.height) || 0,
        $screen_width: Number(screen.width) || 0,
        // 我说两遍写的重复，佳捷说就写两遍
        $lib: 'js',
        $lib_version: String(sd.lib_version)
      };
    },
    // 保存临时的一些变量，只针对当前页面有效
    currentProps: {},
    register: function (obj) {
      _.extend(_.info.currentProps, obj);
    }
  };

  // 发送队列
  _.autoExeQueue = function () {
    var queue = {
      // 简单队列
      items: [],
      enqueue: function (val) {
        this.items.push(val);
        this.start();
      },
      dequeue: function () {
        return this.items.shift();
      },
      getCurrentItem: function () {
        return this.items[0];
      },
      // 自动循环执行队列
      isRun: false,
      start: function () {
        if (this.items.length > 0 && !this.isRun) {
          this.isRun = true;
          this.getCurrentItem().start();
        }
      },
      close: function () {
        this.dequeue();
        this.isRun = false;
        this.start();
      }
    };
    return queue;
  };

  _.trackLink = function (obj, event_name, event_prop) {
    obj = obj || {};
    var link = null;
    if (obj.ele) {
      link = obj.ele;
    }
    if (obj.event) {
      if (obj.target) {
        link = obj.target;
      } else {
        link = obj.event.target;
      }
    }

    event_prop = event_prop || {};
    if (!link || typeof link !== 'object') {
      return false;
    }
    // 如果是非当前页面会跳转的链接，直接track
    if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
      sd.track(event_name, event_prop);
      return false;
    }
    function linkFunc(e) {
      e.stopPropagation();
      e.preventDefault(); // 阻止默认跳转
      var hasCalled = false;
      function track_a_click() {
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
        }
      }
      setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
      sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
    }
    if (obj.event) {
      linkFunc(obj.event);
    }
    if (obj.ele) {
      _.addEvent(obj.ele, 'click', function (e) {
        linkFunc(e);
      });
    }
  };

  _.eventEmitter = function () {
    this._events = [];
    this.pendingEvents = [];
  };

  _.eventEmitter.prototype = {
    emit: function (type) {
      var args = [].slice.call(arguments, 1);

      _.each(this._events, function (val) {
        if (val.type !== type) {
          return;
        }
        val.callback.apply(val.context, args);
      });
    },
    on: function (event, callback, context) {
      if (typeof callback !== 'function') {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });
    },
    tempAdd: function (event, data) {
      if (!data || !event) {
        return;
      }

      this.pendingEvents.push({
        type: event,
        data: data
      });
      this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    isReady: function () {
      var that = this;
      this.tempAdd = this.emit;

      if (this.pendingEvents.length === 0) {
        return;
      }
      _.each(this.pendingEvents, function (val) {
        that.emit(val.type, val.data);
      });

      this.pendingEvents = [];
    }
  };

  /**
   * Obfuscate a plaintext string with a simple rotation algorithm similar to
   * the rot13 cipher.
   */
  _.rot13obfs = function (str, key) {
    str = String(str);
    key = typeof key === 'number' ? key : 13;
    var n = 126;

    var chars = str.split('');

    for (var i = 0, len = chars.length; i < len; i++) {
      var c = chars[i].charCodeAt(0);

      if (c < n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
      }
    }

    return chars.join('');
  };

  /**
   * De-obfuscate an obfuscated string with the method above.
   */
  _.rot13defs = function (str) {
    var key = 13,
      n = 126,
      str = String(str);

    return _.rot13obfs(str, n - key);
  };

  _.urlSafeBase64 = (function () {
    var ENC = {
      '+': '-',
      '/': '_',
      '=': '.'
    };
    var DEC = {
      '-': '+',
      _: '/',
      '.': '='
    };

    /**
     * encode base64 string url safe
     * @param {String} base64 - base64 encoded string
     * @return {String} url-safe-base64 encoded
     */
    var encode = function (base64) {
      return base64.replace(/[+/=]/g, function (m) {
        return ENC[m];
      });
    };

    /**
     * decode url-safe-base64 string to base64
     * @param {String} safe - url-safe-base64 string
     * @return {String} base64 encoded
     */
    var decode = function (safe) {
      return safe.replace(/[-_.]/g, function (m) {
        return DEC[m];
      });
    };

    /**
     * trim padding - `window.atob` might handle trimmed strings, e.g. in Chrome@57, Firefox@52
     * @param {String} string - base64 or url-safe-base64 string
     * @return {String} string with padding chars removed
     */
    var trim = function (string) {
      return string.replace(/[.=]{1,2}$/, '');
    };

    /**
     * checks if `string` is base64 encoded
     * @param {String} string
     * @return {Boolean} true if base64 encoded
     */
    var isBase64 = function (string) {
      return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
    };

    /**
     * checks if `string` is url-safe-base64 encoded
     * @param {String} string
     * @return {Boolean} true if url-safe-base64 encoded
     */
    var isUrlSafeBase64 = function (string) {
      return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string);
    };

    return {
      encode: encode,
      decode: decode,
      trim: trim,
      isBase64: isBase64,
      isUrlSafeBase64: isUrlSafeBase64
    };
  })();

  _.setCssStyle = function (css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(css));
    } catch (e) {
      style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    var firstScript = document.getElementsByTagName('script')[0];
    if (head) {
      if (head.children.length) {
        head.insertBefore(style, head.children[0]);
      } else {
        head.appendChild(style);
      }
    } else {
      firstScript.parentNode.insertBefore(style, firstScript);
    }
  };

  _.isIOS = function () {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  };

  _.getIOSVersion = function () {
    try {
      var version = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
      return version && version[1] ? Number.parseInt(version[1], 10) : '';
    } catch (e) {
      return '';
    }
  };

  _.getUA = function () {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if ((s = ua.match(/opera.([\d.]+)/))) {
      Sys.opera = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/msie ([\d.]+)/))) {
      Sys.ie = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/edge.([\d.]+)/))) {
      Sys.edge = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
      Sys.firefox = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
      Sys.chrome = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
      Sys.safari = Number(s[1].match(/^\d*.\d*/));
    }
    return Sys;
  };

  /**
   * @param {object} obj
   * _.jsonp({
   *   url:'',
   *   callbackName:'',
   *   data:{}, //服务端需要的其他参数，拼接在url后
   *   success:function(data){},
   *   error:function(){},
   *   timeout:3000
   * });
   */
  _.jsonp = function (obj) {
    if (!(_.isObject(obj) && _.isString(obj.callbackName))) {
      sd.log('JSONP 请求缺少 callbackName');
      return false;
    }
    obj.success = _.isFunction(obj.success) ? obj.success : function () {};
    obj.error = _.isFunction(obj.error) ? obj.error : function () {};
    obj.data = obj.data || '';
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var timer = null;
    head.appendChild(script);
    if (_.isNumber(obj.timeout)) {
      timer = setTimeout(function () {
        obj.error('timeout');
        window[obj.callbackName] = function () {
          sd.log('call jsonp error');
        };
        timer = null;
        head.removeChild(script);
      }, obj.timeout);
    }
    window[obj.callbackName] = function (data) {
      obj.success(data);
      window[obj.callbackName] = function () {
        sd.log('call jsonp error');
      };
      clearTimeout(timer);
      timer = null;
      head.removeChild(script);
    };
    if (obj.url.indexOf('?') > -1) {
      obj.url += '&callbackName=' + obj.callbackName;
    } else {
      obj.url += '?callbackName=' + obj.callbackName;
    }
    if (_.isObject(obj.data)) {
      var arr = [];
      _.each(obj.data, function (value, key) {
        arr.push(key + '=' + value);
      });
      obj.data = arr.join('&');
      obj.url += '&' + obj.data;
    }
    script.onerror = function (err) {
      window[obj.callbackName] = function () {
        sd.log('call jsonp error');
      };
      clearTimeout(timer);
      timer = null;
      head.removeChild(script);
      obj.error(err);
    };
    script.src = obj.url;
  };

  _.isSupportBeaconSend = function () {
    var Sys = _.getUA();
    var supported = false;
    var ua = navigator.userAgent.toLowerCase();
    //sendBeacon 浏览器兼容性判断
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      //iOS 上的 Safari11.1–12 无法向未访问的来源发送信号，已在iOS13中修复。
      var reg = /os [\d._]*/gi;
      var verinfo = ua.match(reg);
      var version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
      var ver = version.split('.');
      if (typeof Sys.safari === 'undefined') {
        Sys.safari = ver[0];
      }
      if (ver[0] && ver[0] < 13) {
        if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 12) {
          supported = true;
        }
      } else if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.3) {
        supported = true;
      }
    } else {
      if (Sys.chrome > 38 || Sys.edge > 13 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.0) {
        supported = true;
      }
    }
    return supported;
  };

  _.secCheck = {
    isHttpUrl: function (str) {
      if (typeof str !== 'string') return false;
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(str) === false) {
        sd.log('Invalid URL');
        return false;
      }
      return true;
    },
    removeScriptProtocol: function (str) {
      if (typeof str !== 'string') return '';
      var _regex = /^\s*javascript/i;
      while (_regex.test(str)) {
        str = str.replace(_regex, '');
      }
      return str;
    }
  };
})();
;

/*
sd的各个方法，包含sdk的一些基本功能
*/

sd.para_default = {
  preset_properties: {
    latest_utm: true,
    latest_traffic_source_type: true,
    latest_search_keyword: true,
    latest_referrer: true,
    latest_referrer_host: false,
    latest_landing_page: false,
    latest_wx_ad_click_id: undefined,
    url: true,
    title: true
  },
  encrypt_cookie: false,
  img_use_crossorigin: false,
  //scrollmap:{delay:6000}

  name: 'sa',
  // referrer字符串截取
  max_referrer_string_length: 200,
  //通用字符串截取，超过7000的字符串会导致url超长发不出去，所以限制长度
  max_string_length: 500,
  //    send_error_event: true,
  cross_subdomain: true,
  show_log: true,
  is_debug: false,
  debug_mode: false,
  debug_mode_upload: false,

  // todo 前端session时长
  session_time: 0,

  use_client_time: false,
  //来源参数名字
  source_channel: [],

  send_type: 'image',

  // 七鱼过滤id
  vtrack_ignore: {},

  auto_init: true,

  is_track_single_page: false,

  is_single_page: false,

  batch_send: false,

  // 如果要设置，设置数组
  source_type: {},
  callback_timeout: 200,
  datasend_timeout: 3000,
  queue_timeout: 300,
  is_track_device_id: false,
  ignore_oom: true,
  app_js_bridge: false,
  url_is_decode: false
};

sd.addReferrerHost = function (data) {
  var defaultHost = '取值异常';
  if (_.isObject(data.properties)) {
    if (data.properties.$first_referrer) {
      data.properties.$first_referrer_host = _.getHostname(data.properties.$first_referrer, defaultHost);
    }
    if (data.type === 'track' || data.type === 'track_signup') {
      if ('$referrer' in data.properties) {
        data.properties.$referrer_host = data.properties.$referrer === '' ? '' : _.getHostname(data.properties.$referrer, defaultHost);
      }
      if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
        data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : _.getHostname(data.properties.$latest_referrer, defaultHost);
      }
    }
  }
};

sd.addPropsHook = function (data) {
  if (sd.para.preset_properties && sd.para.preset_properties.url && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$url === 'undefined') {
    data.properties.$url = _.isDecodeURI(sd.para.url_is_decode, window.location.href);
  }
  if (sd.para.preset_properties && sd.para.preset_properties.title && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$title === 'undefined') {
    data.properties.$title = document.title;
  }
};

sd.initPara = function (para) {
  // 默认配置
  sd.para = para || sd.para || {};
  var latestObj = {};
  if (_.isObject(sd.para.is_track_latest)) {
    for (var latestProp in sd.para.is_track_latest) {
      latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
    }
  }
  // 预置属性
  sd.para.preset_properties = _.extend({}, sd.para_default.preset_properties, latestObj, sd.para.preset_properties || {});

  // 合并配置
  var i;
  for (i in sd.para_default) {
    if (sd.para[i] === void 0) {
      sd.para[i] = sd.para_default[i];
    }
  }
  // 修复没有配置协议的问题，自动取当前页面的协议
  if (typeof sd.para.server_url === 'string') {
    sd.para.server_url = _.trim(sd.para.server_url);
    if (sd.para.server_url) {
      if (sd.para.server_url.slice(0, 3) === '://') {
        sd.para.server_url = location.protocol.slice(0, -1) + sd.para.server_url;
      } else if (sd.para.server_url.slice(0, 2) === '//') {
        sd.para.server_url = location.protocol + sd.para.server_url;
      } else if (sd.para.server_url.slice(0, 4) !== 'http') {
        sd.para.server_url = '';
      }
    }
  }

  if (typeof sd.para.web_url === 'string' && (sd.para.web_url.slice(0, 3) === '://' || sd.para.web_url.slice(0, 2) === '//')) {
    if (sd.para.web_url.slice(0, 3) === '://') {
      sd.para.web_url = location.protocol.slice(0, -1) + sd.para.web_url;
    } else {
      sd.para.web_url = location.protocol + sd.para.web_url;
    }
  }

  if (sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon') {
    sd.para.send_type = 'image';
  }

  //校验serverurl与location.href的协议是否一致
  sd.debug.protocol.serverUrl();

  // 初始化打通参数
  sd.bridge.initPara();
  sd.bridge.initState();

  var batch_send_default = {
    datasend_timeout: 6000,
    send_interval: 6000
  };

  if (_.localStorage.isSupport() && _.isSupportCors() && typeof localStorage === 'object') {
    if (sd.para.batch_send === true) {
      sd.para.batch_send = _.extend({}, batch_send_default);
      sd.para.use_client_time = true;
    } else if (typeof sd.para.batch_send === 'object') {
      sd.para.use_client_time = true;
      sd.para.batch_send = _.extend({}, batch_send_default, sd.para.batch_send);
    }
  } else {
    sd.para.batch_send = false;
  }

  var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var search_type = ['www.baidu.', 'm.baidu.', 'm.sm.cn', 'so.com', 'sogou.com', 'youdao.com', 'google.', 'yahoo.com/', 'bing.com/', 'ask.com/'];
  var social_type = ['weibo.com', 'renren.com', 'kaixin001.com', 'douban.com', 'qzone.qq.com', 'zhihu.com', 'tieba.baidu.com', 'weixin.qq.com'];
  var search_keyword = { baidu: ['wd', 'word', 'kw', 'keyword'], google: 'q', bing: 'q', yahoo: 'p', sogou: ['query', 'keyword'], so: 'q', sm: 'q' };

  if (typeof sd.para.source_type === 'object') {
    sd.para.source_type.utm = _.isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(utm_type) : utm_type;
    sd.para.source_type.search = _.isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
    sd.para.source_type.social = _.isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
    sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword) ? _.extend(search_keyword, sd.para.source_type.keyword) : search_keyword;
  }
  var collect_tags_default = {
    div: false
  };
  var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
  if (_.isObject(sd.para.heatmap)) {
    sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
    sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';
    sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
    sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18000; // The max value of $event_duration property for $WebStay event, in seconds (5 Hours).
    sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1000;
    sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;
    var trackAttrs = _.isArray(sd.para.heatmap.track_attr)
      ? _.filter(sd.para.heatmap.track_attr, function (v) {
          return v && typeof v === 'string';
        })
      : [];
    trackAttrs.push('data-sensors-click');
    sd.para.heatmap.track_attr = trackAttrs;

    if (_.isObject(sd.para.heatmap.collect_tags)) {
      if (sd.para.heatmap.collect_tags.div === true) {
        sd.para.heatmap.collect_tags.div = {
          ignore_tags: ignore_tags_default,
          max_level: 1
        };
      } else if (_.isObject(sd.para.heatmap.collect_tags.div)) {
        if (sd.para.heatmap.collect_tags.div.ignore_tags) {
          if (!_.isArray(sd.para.heatmap.collect_tags.div.ignore_tags)) {
            sd.log('ignore_tags 参数必须是数组格式');
            sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
          }
        } else {
          sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
        }
        if (sd.para.heatmap.collect_tags.div.max_level) {
          var supportedDivLevel = [1, 2, 3];
          if (_.indexOf(supportedDivLevel, sd.para.heatmap.collect_tags.div.max_level) === -1) {
            sd.para.heatmap.collect_tags.div.max_level = 1;
          }
        }
      } else {
        sd.para.heatmap.collect_tags.div = false;
      }
    } else {
      sd.para.heatmap.collect_tags = collect_tags_default;
    }
  }
  // 优化配置
if (_.isArray(sd.para.server_url) && sd.para.server_url.length) {
    for (i = 0; i < sd.para.server_url.length; i++) {
      if (!/sa\a[^\/]*$/.test(sd.para.server_url[i])) {
        sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.a').replace(/(\/sa)(\?[^\/]+)$/, '/sa.a$2');
      }
    }
  } else if (!/sa\.a[^\/]*$/.test(sd.para.server_url) && typeof sd.para.server_url === 'string') {
    sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.a').replace(/(\/sa)(\?[^\/]+)$/, '/sa.a$2');
  }
  if (typeof sd.para.server_url === 'string') {
    sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.a', 'debug');
  }
  // 是否需要非cache，等于每次请求文件
  if (sd.para.noCache === true) {
    sd.para.noCache = '?' + new Date().getTime();
  } else {
    sd.para.noCache = '';
  }

  if (sd.para.callback_timeout > sd.para.datasend_timeout) {
    sd.para.datasend_timeout = sd.para.callback_timeout;
  }
  if (sd.para.callback_timeout > sd.para.queue_timeout) {
    sd.para.queue_timeout = sd.para.callback_timeout;
  }
  if (sd.para.queue_timeout > sd.para.datasend_timeout) {
    sd.para.datasend_timeout = sd.para.queue_timeout;
  }
};

// sa 当前状态管理
sd.readyState = {
  state: 0,
  historyState: [],
  stateType: {
    1: '1-init未开始',
    2: '2-init开始',
    3: '3-store完成'
  },
  getState: function () {
    return this.historyState.join('\n');
  },
  setState: function (n) {
    if (String(n) in this.stateType) {
      this.state = n;
    }
    this.historyState.push(this.stateType[n]);
  }
};

sd.setPreConfig = function (sa) {
  sd.para = sa.para;
  sd._q = sa._q;
};

sd.setInitVar = function () {
  sd._t = sd._t || 1 * new Date();
  sd.lib_version = '1.17.2';
  sd.is_first_visitor = false;
  // 标准广告系列来源
  sd.source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
};

sd.log = function () {
  if ((_.sessionStorage.isSupport() && sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') || sd.para.show_log) {
    if (_.isObject(arguments[0]) && (sd.para.show_log === true || sd.para.show_log === 'string' || sd.para.show_log === false)) {
      arguments[0] = _.formatJsonString(arguments[0]);
    }

    if (typeof console === 'object' && console.log) {
      try {
        return console.log.apply(console, arguments);
      } catch (e) {
        console.log(arguments[0]);
      }
    }
  }
};

/**
 * 设置 sessionStorage 开启本地控制台日志输出
 */
sd.enableLocalLog = function () {
  if (_.sessionStorage.isSupport()) {
    try {
      sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
    } catch (e) {
      sd.log('enableLocalLog error: ' + e.message);
      // handle the exception here.
    }
  }
};

/**
 * 删除 sessionStorage 关闭本地控制台日志输出
 */
sd.disableLocalLog = function () {
  if (_.sessionStorage.isSupport()) {
    sessionStorage.removeItem('sensorsdata_jssdk_debug');
  }
};

sd.debug = {
  distinct_id: function () {
    /*
    var relation = {
      'e-0': '未知错误',
      'e-1': 'toState()传值的数据中缺少distinct_id，SDK自动分配distinct_id',
      'e-2': 'toState()传值的数据不是一个有效的JSON字符串，SDK自动分配distinct_id'
    };
    var debug_info = relation['e-' + key] || relation['e-0'];
    if (sd.para.is_debug === true || sd.para.is_debug.distinct_id === true) {
      sd.log(debug_info);
      this._sendDebug('distinct_id-' + key + '-' + JSON.stringify(data));
    }
    */
  },
  jssdkDebug: function () {
    /*
    if (sd.para.is_debug === true) {
      if(_.isString(recevie_prop)){
        this._sendDebug(recevie_prop);
      }else{
        var cookie = store.getCookieName();
        var match = document.cookie.match(new RegExp(cookie + '[^;]+'));
        if(match && match[0] ){
          cookie = match[0];
        }else{
          cookie = '';
        }
        recevie_prop._jssdk_debug_info = '(' + cookie + ')' + navigator.userAgent;
        this._sendDebug(JSON.stringify(recevie_prop));
      }
    }
    */
  },
  _sendDebug: function (debugString) {
    sd.track('_sensorsdata2019_debug', {
      _jssdk_debug_info: debugString
    });
  },
  apph5: function (obj) {
    var name = 'app_h5打通失败-';
    var relation = {
      1: name + 'use_app_track为false',
      2: name + 'Android或者iOS，没有暴露相应方法',
      3.1: name + 'Android校验server_url失败',
      3.2: name + 'iOS校验server_url失败',
      4.1: name + 'H5 校验 iOS server_url 失败',
      4.2: name + 'H5 校验 Android server_url 失败'
    };
    var output = obj.output;
    var step = obj.step;
    var data = obj.data || '';
    // 控制台输出
    if (output === 'all' || output === 'console') {
      sd.log(relation[step]);
    }
    // 代码输出
    if ((output === 'all' || output === 'code') && _.isObject(sd.para.is_debug) && sd.para.is_debug.apph5) {
      if (!data.type || data.type.slice(0, 7) !== 'profile') {
        data.properties._jssdk_debug_info = 'apph5-' + String(step);
      }
    }
  },
  defineMode: function (type) {
    var debugList = {
      1: {
        title: '当前页面无法进行可视化全埋点',
        message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      },
      2: {
        title: '当前页面无法进行可视化全埋点',
        message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      },
      3: {
        title: '当前页面无法进行可视化全埋点',
        message: 'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
      },
      4: {
        title: '当前页面无法进行可视化全埋点',
        message: 'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
        link_text: '配置文档',
        link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
      }
    };
    if (type && debugList[type]) {
      return debugList[type];
    } else {
      return false;
    }
  },
  protocol: {
    protocolIsSame: function (url1, url2) {
      try {
        if (_.URL(url1).protocol !== _.URL(url2).protocol) {
          return false;
        }
      } catch (error) {
        sd.log('不支持 _.URL 方法');
        return false;
      }
      return true;
    },
    serverUrl: function () {
      //由于个别浏览器安全限制协议不一致可能发送失败
      if (_.isString(sd.para.server_url) && sd.para.server_url !== '' && !this.protocolIsSame(sd.para.server_url, location.href)) {
        sd.log('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
      }
    },
    ajax: function (url) {
      //埋点请求不校验
      if (url === sd.para.server_url) {
        return false;
      }
      //其他业务如abtest使用ajax的校验
      if (_.isString(url) && url !== '' && !this.protocolIsSame(url, location.href)) {
        sd.log('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
      }
    }
  }
};

var commonWays = {
  setOnlineState: function (state) {
    if (state === true && _.isObject(sd.para.jsapp) && typeof sd.para.jsapp.getData === 'function') {
      sd.para.jsapp.isOnline = true;
      var arr = sd.para.jsapp.getData();
      if (_.isArray(arr) && arr.length > 0) {
        _.each(arr, function (str) {
          if (_.isJSONString(str)) {
            sd.sendState.pushSend(JSON.parse(str));
          }
        });
      }
    } else {
      sd.para.jsapp.isOnline = false;
    }
  },
  autoTrackIsUsed: false,
  isReady: function (callback) {
    callback();
  },
  // 获取谷歌标准参数
  getUtm: function () {
    return _.info.campaignParams();
  },
  // 获取当前页面停留时间
  getStayTime: function () {
    return (new Date() - sd._t) / 1000;
  },
  setProfileLocal: function (obj) {
    if (!_.localStorage.isSupport()) {
      sd.setProfile(obj);
      return false;
    }
    if (!_.isObject(obj) || _.isEmptyObject(obj)) {
      return false;
    }
    var saveData = _.localStorage.parse('sensorsdata_2015_jssdk_profile');
    var isNeedSend = false;
    if (_.isObject(saveData) && !_.isEmptyObject(saveData)) {
      for (var i in obj) {
        if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
          saveData[i] = obj[i];
          isNeedSend = true;
        }
      }
      if (isNeedSend) {
        _.localStorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(saveData));
        sd.setProfile(obj);
      }
    } else {
      _.localStorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(obj));
      sd.setProfile(obj);
    }
  },
  //set init referrer
  setInitReferrer: function () {
    var _referrer = _.getReferrer();
    sd.setOnceProfile({
      _init_referrer: _referrer,
      _init_referrer_host: _.info.pageProp.referrer_host
    });
  },
  // set init sessionRegister cookie
  setSessionReferrer: function () {
    var _referrer = _.getReferrer();
    store.setSessionPropsOnce({
      _session_referrer: _referrer,
      _session_referrer_host: _.info.pageProp.referrer_host
    });
  },
  // set default referrr and pageurl
  setDefaultAttr: function () {
    _.info.register({
      _current_url: location.href,
      _referrer: _.getReferrer(),
      _referring_host: _.info.pageProp.referrer_host
    });
  },
  trackHeatMap: function (target, props, callback) {
    if (typeof target === 'object' && target.tagName) {
      var tagName = target.tagName.toLowerCase();
      var parent_ele = target.parentNode.tagName.toLowerCase();
      var trackAttrs = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ['data-sensors-click'];
      if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea' && !_.hasAttributes(target, trackAttrs)) {
        heatmap.start(null, target, tagName, props, callback);
      }
    }
  },
  trackAllHeatMap: function (target, props, callback) {
    if (typeof target === 'object' && target.tagName) {
      var tagName = target.tagName.toLowerCase();
      heatmap.start(null, target, tagName, props, callback);
    }
  },
  autoTrackSinglePage: function (para, callback) {
    if (this.autoTrackIsUsed) {
      var url = _.info.pageProp.url;
    } else {
      var url = _.info.pageProp.referrer;
    }
    para = _.isObject(para) ? para : {};

    para = _.isObject(para) ? para : {};

    function getUtm() {
      var utms = _.info.campaignParams();
      var $utms = {};
      _.each(utms, function (v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });
      return $utms;
    }

    if (sd.is_first_visitor && !para.not_set_profile) {
      sd.setOnceProfile(
        _.extend(
          {
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: _.info.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
            $first_browser_language: navigator.language || '取值异常',
            $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
            $first_traffic_source_type: _.getSourceFromReferrer(),
            $first_search_keyword: _.getKeywordFromReferrer()
          },
          getUtm()
        )
      );
      sd.is_first_visitor = false;
    }
    if (para.not_set_profile) {
      delete para.not_set_profile;
    }

    function closure(p, c) {
      sd.track(
        '$pageview',
        _.extend(
          {
            $referrer: _.isDecodeURI(sd.para.url_is_decode, url),
            $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
            $url_path: location.pathname,
            $title: document.title
          },
          p,
          getUtm()
        ),
        c
      );
      url = location.href;
    }
    closure(para, callback);
    this.autoTrackSinglePage = closure;
  },
  autoTrackWithoutProfile: function (para, callback) {
    para = _.isObject(para) ? para : {};
    this.autoTrack(_.extend(para, { not_set_profile: true }), callback);
  },
  autoTrack: function (para, callback) {
    para = _.isObject(para) ? para : {};

    var utms = _.info.campaignParams();
    var $utms = {};
    _.each(utms, function (v, i, utms) {
      if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    });
    // setOnceProfile 如果是新用户，且允许设置profile
    if (sd.is_first_visitor && !para.not_set_profile) {
      sd.setOnceProfile(
        _.extend(
          {
            // 暂时隐藏，等extractor都部署上去 $first_landing_page: _.info.pageProp.url.slice(0, sd.para.max_referrer_string_length),
            $first_visit_time: new Date(),
            $first_referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
            $first_browser_language: navigator.language || '取值异常',
            $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
            $first_traffic_source_type: _.getSourceFromReferrer(),
            $first_search_keyword: _.getKeywordFromReferrer()
          },
          $utms
        )
      );
      sd.is_first_visitor = false;
    }
    if (para.not_set_profile) {
      delete para.not_set_profile;
    }

    // 解决单页面的referrer问题
    var current_page_url = location.href;

    if (sd.para.is_single_page) {
      _.addHashEvent(function () {
        var referrer = _.getReferrer(current_page_url);
        sd.track(
          '$pageview',
          _.extend(
            {
              $referrer: _.isDecodeURI(sd.para.url_is_decode, referrer),
              $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
              $url_path: location.pathname,
              $title: document.title
            },
            $utms,
            para
          ),
          callback
        );
        current_page_url = location.href;
      });
    }
    sd.track(
      '$pageview',
      _.extend(
        {
          $referrer: _.isDecodeURI(sd.para.url_is_decode, _.getReferrer()),
          $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
          $url_path: location.pathname,
          $title: document.title
        },
        $utms,
        para
      ),
      callback
    );
    this.autoTrackIsUsed = true;
  },
  getAnonymousID: function () {
    if (_.isEmptyObject(sd.store._state)) {
      return '请先初始化SDK';
    } else {
      // 优先使用临时属性
      return sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id;
    }
  },
  setPlugin: function (para) {
    if (!_.isObject(para)) {
      return false;
    }
    //      sd.pluginTempFunction = sd.pluginTempFunction || {};
    _.each(para, function (v, k) {
      if (_.isFunction(v)) {
        //          sd.pluginTempFunction[k] = v;
        if (_.isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[k]) {
          v(window.SensorsDataWebJSSDKPlugin[k]);
          //            delete sd.pluginTempFunction[k];
        } else {
          sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
        }
      }
    });
  },
  useModulePlugin: function () {
    sd.use.apply(sd, arguments);
  },
  useAppPlugin: function () {
    this.setPlugin.apply(this, arguments);
  }
  /*,
    pluginIsReady: function(para){
      // sdk先加载，popup后加载调用 quick('pluginIsReady',{name:popup,self:this})
      if(!sd.pluginTempFunction || !_.isObject(para) || !_.isFunction(para.name)){
        return false;
      }
      if(sd.pluginTempFunction[para.name]){
        sd.pluginTempFunction[para.name](para.self);
        delete sd.pluginTempFunction[para.name];
      }
    }*/
};

// 一些常见的方法
sd.quick = function () {
  var arg = Array.prototype.slice.call(arguments);
  var arg0 = arg[0];
  var arg1 = arg.slice(1);
  if (typeof arg0 === 'string' && commonWays[arg0]) {
    return commonWays[arg0].apply(commonWays, arg1);
  } else if (typeof arg0 === 'function') {
    arg0.apply(sd, arg1);
  } else {
    sd.log('quick方法中没有这个功能' + arg[0]);
  }
};

// 调用插件的 init 方法,并且返回插件对象

sd.use = function (name, option) {
  if (!_.isString(name)) {
    sd.log('use插件名称必须是字符串！');
    return false;
  }

  if (_.isObject(window.SensorsDataWebJSSDKPlugin) && _.isObject(window.SensorsDataWebJSSDKPlugin[name]) && _.isFunction(window.SensorsDataWebJSSDKPlugin[name].init)) {
    window.SensorsDataWebJSSDKPlugin[name].init(sd, option);
    return window.SensorsDataWebJSSDKPlugin[name];
  } else if (_.isObject(sd.modules) && _.isObject(sd.modules[name]) && _.isFunction(sd.modules[name].init)) {
    sd.modules[name].init(sd, option);
    return sd.modules[name];
  } else {
    sd.log(name + '没有获取到,请查阅文档，调整' + name + '的引入顺序！');
  }
};

/*
 * @param {string} event
 * @param {string} properties
 * */
sd.track = function (e, p, c) {
  if (saEvent.check({ event: e, properties: p })) {
    saEvent.send(
      {
        type: 'track',
        event: e,
        properties: p
      },
      c
    );
  }
};

sd.trackLink = function (link, event_name, event_prop) {
  if (typeof link === 'object' && link.tagName) {
    _.trackLink({ ele: link }, event_name, event_prop);
  } else if (typeof link === 'object' && link.target && link.event) {
    _.trackLink(link, event_name, event_prop);
  }
};
// 跟踪链接
sd.trackLinks = function (link, event_name, event_prop) {
  var ele = link;
  event_prop = event_prop || {};
  if (!link || typeof link !== 'object') {
    return false;
  }
  if (!link.href || /^javascript/.test(link.href) || link.target) {
    return false;
  }
  _.addEvent(link, 'click', function (e) {
    e.preventDefault(); // 阻止默认跳转
    var hasCalled = false;
    setTimeout(track_a_click, 1000); //如果没有回调成功，设置超时回调
    function track_a_click() {
      if (!hasCalled) {
        hasCalled = true;
        location.href = link.href; //把 A 链接的点击跳转,改成 location 的方式跳转
      }
    }
    sd.track(event_name, event_prop, track_a_click); //把跳转操作加在callback里
  });
};

/*
 * @param {object} properties
 * */
sd.setProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    saEvent.send(
      {
        type: 'profile_set',
        properties: p
      },
      c
    );
  }
};

sd.setOnceProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    saEvent.send(
      {
        type: 'profile_set_once',
        properties: p
      },
      c
    );
  }
};

/*
 * @param {object} properties
 * */
sd.appendProfile = function (p, c) {
  if (saEvent.check({ propertiesMust: p })) {
    _.each(p, function (value, key) {
      if (_.isString(value)) {
        p[key] = [value];
      } else if (_.isArray(value)) {
        p[key] = value;
      } else {
        delete p[key];
        sd.log('appendProfile属性的值必须是字符串或者数组');
      }
    });
    if (!_.isEmptyObject(p)) {
      saEvent.send(
        {
          type: 'profile_append',
          properties: p
        },
        c
      );
    }
  }
};
/*
 * @param {object} properties
 * */
sd.incrementProfile = function (p, c) {
  var str = p;
  if (_.isString(p)) {
    p = {};
    p[str] = 1;
  }
  function isChecked(p) {
    for (var i in p) {
      if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
        return false;
      }
    }
    return true;
  }

  if (saEvent.check({ propertiesMust: p })) {
    if (isChecked(p)) {
      saEvent.send(
        {
          type: 'profile_increment',
          properties: p
        },
        c
      );
    } else {
      sd.log('profile_increment的值只能是数字');
    }
  }
};

sd.deleteProfile = function (c) {
  saEvent.send(
    {
      type: 'profile_delete'
    },
    c
  );
  store.set('distinct_id', _.UUID());
  store.set('first_id', '');
};
/*
 * @param {object} properties
 * */
sd.unsetProfile = function (p, c) {
  var str = p;
  var temp = {};
  if (_.isString(p)) {
    p = [];
    p.push(str);
  }
  if (_.isArray(p)) {
    _.each(p, function (v) {
      if (_.isString(v)) {
        temp[v] = true;
      } else {
        sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
      }
    });
    saEvent.send(
      {
        type: 'profile_unset',
        properties: temp
      },
      c
    );
  } else {
    sd.log('profile_unset的参数是数组');
  }
};
/*
 * @param {string} distinct_id
 * */
sd.identify = function (id, isSave) {
  if (typeof id === 'number') {
    id = String(id);
  }
  var firstId = store.getFirstId();
  if (typeof id === 'undefined') {
    var uuid = _.UUID();
    if (firstId) {
      store.set('first_id', uuid);
    } else {
      store.set('distinct_id', uuid);
    }
  } else if (saEvent.check({ distinct_id: id })) {
    if (isSave === true) {
      if (firstId) {
        store.set('first_id', id);
      } else {
        store.set('distinct_id', id);
      }
    } else {
      if (firstId) {
        store.change('first_id', id);
      } else {
        store.change('distinct_id', id);
      }
    }
  } else {
    sd.log('identify的参数必须是字符串');
  }
};
/*
 * 这个接口是一个较为复杂的功能，请在使用前先阅读相关说明:http://www.sensorsdata.cn/manual/track_signup.html，并在必要时联系我们的技术支持人员。
 * @param {string} distinct_id
 * @param {string} event
 * @param {object} properties
 * */
sd.trackSignup = function (id, e, p, c) {
  if (saEvent.check({ distinct_id: id, event: e, properties: p })) {
    var original_id = store.getFirstId() || store.getDistinctId();
    store.set('distinct_id', id);
    saEvent.send(
      {
        original_id: original_id,
        distinct_id: id,
        type: 'track_signup',
        event: e,
        properties: p
      },
      c
    );
  }
};

/*
 * @param {string} testid
 * @param {string} groupid
 * */

/**
 * Register a set of properties, which are included with all events.
 *
 * @param {Object} obj - An object of properties to be registered.
 *
 */
sd.registerPage = function (obj) {
  if (saEvent.check({ properties: obj })) {
    _.extend(_.info.currentProps, obj);
  } else {
    sd.log('register输入的参数有误');
  }
};

sd.clearAllRegister = function (arr) {
  store.clearAllProps(arr);
};

sd.clearPageRegister = function (arr) {
  if (_.isArray(arr) && arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (_.isString(arr[i]) && arr[i] in _.info.currentProps) {
        delete _.info.currentProps[arr[i]];
      }
    }
  } else if (arr === true) {
    for (var i in _.info.currentProps) {
      delete _.info.currentProps[i];
    }
  }
};

sd.register = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setProps(props);
  } else {
    sd.log('register输入的参数有误');
  }
};

sd.registerOnce = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setPropsOnce(props);
  } else {
    sd.log('registerOnce输入的参数有误');
  }
};

sd.registerSession = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setSessionProps(props);
  } else {
    sd.log('registerSession输入的参数有误');
  }
};

sd.registerSessionOnce = function (props) {
  if (saEvent.check({ properties: props })) {
    store.setSessionPropsOnce(props);
  } else {
    sd.log('registerSessionOnce输入的参数有误');
  }
};

sd.login = function (id, callback) {
  if (typeof id === 'number') {
    id = String(id);
  }
  if (saEvent.check({ distinct_id: id })) {
    var firstId = store.getFirstId();
    var distinctId = store.getDistinctId();
    if (id !== distinctId) {
      if (!firstId) {
        store.set('first_id', distinctId);
      }
      sd.trackSignup(id, '$SignUp', {}, callback);
    } else {
      callback && callback();
    }
  } else {
    sd.log('login的参数必须是字符串');
    callback && callback();
  }
};

sd.logout = function (isChangeId) {
  var firstId = store.getFirstId();
  if (firstId) {
    store.set('first_id', '');
    if (isChangeId === true) {
      var uuid = _.UUID();
      store.set('distinct_id', uuid);
    } else {
      store.set('distinct_id', firstId);
    }
  } else {
    sd.log('没有first_id，logout失败');
  }
};

sd.getPresetProperties = function () {
  function getUtm() {
    var utms = _.info.campaignParams();
    var $utms = {};
    _.each(utms, function (v, i, utms) {
      if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
        $utms['$' + i] = utms[i];
      } else {
        $utms[i] = utms[i];
      }
    });
    return $utms;
  }

  var obj = {
    $is_first_day: _.cookie.getNewUser(),
    $referrer: _.isDecodeURI(sd.para.url_is_decode, _.info.pageProp.referrer) || '',
    $referrer_host: _.info.pageProp.referrer ? _.getHostname(_.info.pageProp.referrer) : '',
    $url: _.isDecodeURI(sd.para.url_is_decode, location.href),
    $url_path: location.pathname,
    $title: document.title || '',
    _distinct_id: store.getDistinctId()
  };
  var result = _.extend({}, _.info.properties(), sd.store.getProps(), getUtm(), obj);
  if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
    result.$latest_referrer_host = result.$latest_referrer === '' ? '' : _.getHostname(result.$latest_referrer);
  }
  return result;
};
/*
  sd.noticePluginIsReady = function(){
    if(_.isObject(window.SensorsDataWebJSSDKPlugin)){
      _.each(window.SensorsDataWebJSSDKPlugin, function(v,k){
        if((_.isObject(v) || _.isFunction(v)) && _.isFunction(v['setWebSDKReady'])){
          v['setWebSDKReady']();
        }
      });
    }
  };
*/

sd.detectMode = function () {
  var heatmapMode = {
    searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
    isSeachHasKeyword: function () {
      var match = this.searchKeywordMatch;
      if (match && match[0] && match[1]) {
        if (typeof sessionStorage.getItem('sensors-visual-mode') === 'string') {
          sessionStorage.removeItem('sensors-visual-mode');
        }
        return true;
      } else {
        return false;
      }
    },
    hasKeywordHandle: function () {
      var match = this.searchKeywordMatch;
      var type = location.search.match(/sa-request-type=([^&#]+)/);
      var web_url = location.search.match(/sa-request-url=([^&#]+)/);
      heatmap.setNotice(web_url);
      if (_.sessionStorage.isSupport()) {
        if (web_url && web_url[0] && web_url[1]) {
          sessionStorage.setItem('sensors_heatmap_url', decodeURIComponent(web_url[1]));
        }
        sessionStorage.setItem('sensors_heatmap_id', match[1]);
        if (type && type[0] && type[1]) {
          if (type[1] === '1' || type[1] === '2' || type[1] === '3') {
            type = type[1];
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
            type = sessionStorage.getItem('sensors_heatmap_type');
          } else {
            type = null;
          }
        }
      }
      this.isReady(match[1], type);
    },
    isReady: function (data, type, url) {
      if (sd.para.heatmap_url) {
        _.loadScript({
          success: function () {
            setTimeout(function () {
              if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                sa_jssdk_heatmap_render(sd, data, type, url);
                if (typeof console === 'object' && typeof console.log === 'function') {
                  if (!(sd.heatmap_version && sd.heatmap_version === sd.lib_version)) {
                    console.log('heatmap.js与sensorsdata.js版本号不一致，可能存在风险!');
                  }
                }
              }
            }, 0);
          },
          error: function () {},
          type: 'js',
          url: sd.para.heatmap_url
        });
      } else {
        sd.log('没有指定heatmap_url的路径');
      }
    },
    isStorageHasKeyword: function () {
      return _.sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string';
    },
    storageHasKeywordHandle: function () {
      heatmap.setNotice();
      heatmapMode.isReady(sessionStorage.getItem('sensors_heatmap_id'), sessionStorage.getItem('sensors_heatmap_type'), location.href);
    }
  };

  var vtrackMode = {
    isStorageHasKeyword: function () {
      return _.sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors-visual-mode') === 'string';
    },
    isSearchHasKeyword: function () {
      if (location.search.match(/sa-visual-mode=true/)) {
        if (typeof sessionStorage.getItem('sensors_heatmap_id') === 'string') {
          sessionStorage.removeItem('sensors_heatmap_id');
        }
        return true;
      } else {
        return false;
      }
    },
    loadVtrack: function () {
      _.loadScript({
        success: function () {},
        error: function () {},
        type: 'js',
        url: sd.para.vtrack_url ? sd.para.vtrack_url : location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vtrack.min.js'
      });
    },
    messageListener: function (event) {
      if (event.data.source !== 'sa-fe') {
        return false;
      }
      if (event.data.type === 'v-track-mode') {
        if (event.data.data && event.data.data.isVtrack) {
          if (_.sessionStorage.isSupport()) {
            sessionStorage.setItem('sensors-visual-mode', 'true');
          }
          if (event.data.data.userURL && location.search.match(/sa-visual-mode=true/)) {
            function validUrl(value) {
              if (_.secCheck.isHttpUrl(value)) {
                return _.secCheck.removeScriptProtocol(value);
              } else {
                sd.log('可视化模式检测 URL 失败');          
                return false;
              }
            }
            var valid_url = validUrl(event.data.data.userURL);
            if (valid_url) {
              window.location.href = valid_url;
            }
          } else {
            vtrackMode.loadVtrack();
          }
        }
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    removeMessageHandle: function () {
      if (window.removeEventListener) {
        window.removeEventListener('message', vtrackMode.messageListener, false);
      }
    },
    verifyVtrackMode: function () {
      if (window.addEventListener) {
        window.addEventListener('message', vtrackMode.messageListener, false);
      }
      vtrackMode.postMessage();
    },
    postMessage: function () {
      if (window.parent && window.parent.postMessage) {
        window.parent.postMessage(
          {
            source: 'sa-web-sdk',
            type: 'v-is-vtrack',
            data: {
              sdkversion: '1.17.2'
            }
          },
          '*'
        );
      }
    },
    notifyUser: function () {
      var fn = function (event) {
        if (event.data.source !== 'sa-fe') {
          return false;
        }
        if (event.data.type === 'v-track-mode') {
          if (event.data.data && event.data.data.isVtrack) {
            alert('当前版本不支持，请升级部署神策数据治理');
          }
          window.removeEventListener('message', fn, false);
        }
      };
      if (window.addEventListener) {
        window.addEventListener('message', fn, false);
      }
      vtrackMode.postMessage();
    }
  };

  var defineMode = function (isLoaded) {
    var bridgeObj = sd.bridge.initDefineBridgeInfo();
    function getAndPostDebugInfo() {
      var arr = [];
      if (!bridgeObj.touch_app_bridge) {
        //App 没有开启打通
        arr.push(sd.debug.defineMode('1'));
      }
      if (!_.isObject(sd.para.app_js_bridge)) {
        //H5 没有开启打通
        arr.push(sd.debug.defineMode('2'));
        //H5 没有开启打通verify_success也会是fail ，为了防止干扰defineMode(4)，这里置为false
        bridgeObj.verify_success = false;
      }
      if (!(_.isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default')) {
        //H5 没有开启全埋点
        arr.push(sd.debug.defineMode('3'));
      }
      if (bridgeObj.verify_success === 'fail') {
        //校验失败
        arr.push(sd.debug.defineMode('4'));
      }
      var data = {
        callType: 'app_alert',
        data: arr
      };

      if (SensorsData_App_Visual_Bridge && SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info) {
        SensorsData_App_Visual_Bridge.sensorsdata_visualized_alert_info(JSON.stringify(data));
      } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
        window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(data));
      }
    }

    if (_.isObject(window.SensorsData_App_Visual_Bridge) && window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode && (window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode === true || window.SensorsData_App_Visual_Bridge.sensorsdata_visualized_mode())) {
      if (_.isObject(sd.para.heatmap) && sd.para.heatmap.clickmap == 'default') {
        if (_.isObject(sd.para.app_js_bridge) && bridgeObj.verify_success === 'success') {
          if (!isLoaded) {
            var protocol = location.protocol;
            var protocolArr = ['http:', 'https:'];
            protocol = _.indexOf(protocolArr, protocol) > -1 ? protocol : 'https:';
            _.loadScript({
              success: function () {
                setTimeout(function () {
                  if (typeof sa_jssdk_app_define_mode !== 'undefined') {
                    sa_jssdk_app_define_mode(sd, isLoaded);
                  }
                }, 0);
              },
              error: function () {},
              type: 'js',
              url: protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/vapph5define.min.js'
            });
          } else {
            sa_jssdk_app_define_mode(sd, isLoaded);
          }
        } else {
          //打通失败弹框debug信息传给App
          getAndPostDebugInfo();
        }
      } else {
        //未开启全埋点弹框
        getAndPostDebugInfo();
      }
    }
  };

  function trackMode() {
    sd.readyState.setState(3);

    var visualizedBridge = new sd.JSBridge({
      type: 'visualized',
      app_call_js: function () {
        if (typeof sa_jssdk_app_define_mode !== 'undefined') {
          defineMode(true);
        } else {
          defineMode(false);
        }
      }
    });

    defineMode(false);

    sd.bridge.app_js_bridge_v1();
    // 初始化referrer等页面属性 1.6
    _.info.initPage();

    if (sd.para.is_track_single_page) {
      _.addSinglePageEvent(function (last_url) {
        var sendData = function (extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            _.info.pageProp.referrer = last_url;
            last_url = _.isDecodeURI(sd.para.url_is_decode, last_url);
            sd.quick('autoTrack', _.extend({ $url: _.isDecodeURI(sd.para.url_is_decode, location.href), $referrer: last_url }, extraData));
          }
        };
        if (typeof sd.para.is_track_single_page === 'boolean') {
          sendData();
        } else if (typeof sd.para.is_track_single_page === 'function') {
          var returnValue = sd.para.is_track_single_page();
          if (_.isObject(returnValue)) {
            sendData(returnValue);
          } else if (returnValue === true) {
            sendData();
          }
        }
      });
    }
    // 支持localstorage且开启了batch_send
    if (sd.para.batch_send) {
      _.addEvent(window, 'onpagehide' in window ? 'pagehide' : 'unload', function (e) {
        sd.batchSend.clearPendingStatus();
      });
      sd.batchSend.batchInterval();
    }
    // 初始化distinct_id
    sd.store.init();

    sd.readyState.setState(4);
    //    sd.noticePluginIsReady();
    // 发送数据
    if (sd._q && _.isArray(sd._q) && sd._q.length > 0) {
      _.each(sd._q, function (content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    //进入热力图采集模式
    if (_.isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  if (sd.para.heatmap && sd.para.heatmap.collect_tags && _.isObject(sd.para.heatmap.collect_tags)) {
    _.each(sd.para.heatmap.collect_tags, function (val, key) {
      if ((key !== 'div') && val) {
        sd.heatmap.otherTags.push(key);
      }
    });
  }

  // 通过检查参数，判断是否是点击图模式
  if (heatmapMode.isSeachHasKeyword()) {
    heatmapMode.hasKeywordHandle();
  } else if (window.parent !== self && vtrackMode.isSearchHasKeyword()) {
    vtrackMode.verifyVtrackMode();
  } else if (heatmapMode.isStorageHasKeyword()) {
    heatmapMode.storageHasKeywordHandle();
  } else if (window.parent !== self && vtrackMode.isStorageHasKeyword()) {
    vtrackMode.verifyVtrackMode();
  } else {
    trackMode();
    vtrackMode.notifyUser();
  }
};
;

/*
数据处理和发送的流程
数据批量发送
*/

function BatchSend() {
  //正在发送中的数据，如果后续还有，就不发送
  this.sendingData = 0;
  this.sendingItemKeys = [];
}

BatchSend.prototype = {
  add: function (data) {
    if (_.isObject(data)) {
      this.writeStore(data);
      if (data.type === 'track_signup' || data.event === '$pageview') {
        this.sendStrategy();
      }
    }
  },
  clearPendingStatus: function () {
    if (this.sendingItemKeys.length) {
      this.removePendingItems(this.sendingItemKeys);
    }
  },
  remove: function (keys) {
    var me = this;
    if (this.sendingData > 0) {
      --this.sendingData;
    }
    if (_.isArray(keys) && keys.length > 0) {
      _.each(keys, function (key) {
        _.localStorage.remove(key);
      });
    }
  },
  send: function (data) {
    var me = this;
    var server_url;
    if ((_.isString(sd.para.server_url) && sd.para.server_url !== '') || (_.isArray(sd.para.server_url) && sd.para.server_url.length)) {
      server_url = _.isArray(sd.para.server_url) ? sd.para.server_url[0] : sd.para.server_url;
    } else {
      sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
      return;
    }
    console.log(2,encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))))
    alert(2,encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))))
    _.ajax({
      url: server_url,
      type: 'POST',
      data: 'data_list=' + encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))),
      credentials: false,
      timeout: sd.para.batch_send.datasend_timeout,
      cors: true,
      success: function () {
        console.log(1,encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))))
        alert(1,encodeURIComponent(_.base64Encode(JSON.stringify(data.vals))))
        me.remove(data.keys);
        me.removePendingItems(data.keys);
      },
      error: function () {
        if (me.sendingData > 0) {
          --me.sendingData;
        }
        me.removePendingItems(data.keys);
      }
    });
  },
  appendPendingItems: function (newKeys) {
    if (_.isArray(newKeys) === false) {
      return;
    }
    this.sendingItemKeys = _.unique(this.sendingItemKeys.concat(newKeys));
    try {
      var existingItems = this.getPendingItems();
      var newItems = _.unique(existingItems.concat(newKeys));
      localStorage.setItem('sawebjssdk-sendingitems', JSON.stringify(newItems));
    } catch (e) {}
  },
  removePendingItems: function (keys) {
    if (_.isArray(keys) === false) {
      return;
    }
    if (this.sendingItemKeys.length) {
      this.sendingItemKeys = _.filter(this.sendingItemKeys, function (item) {
        return _.indexOf(keys, item) === -1;
      });
    }
    try {
      var existingItems = this.getPendingItems();
      var newItems = _.filter(existingItems, function (item) {
        return _.indexOf(keys, item) === -1;
      });
      localStorage.setItem('sawebjssdk-sendingitems', JSON.stringify(newItems));
    } catch (e) {}
  },
  getPendingItems: function () {
    var items = [];
    try {
      var value = localStorage.getItem('sawebjssdk-sendingitems');
      if (value) {
        items = JSON.parse(value);
      }
    } catch (e) {}
    return items;
  },
  sendPrepare: function (data) {
    this.appendPendingItems(data.keys);
    var arr = data.vals;
    var arrLen = arr.length;
    if (arrLen > 0) {
      this.send({
        keys: data.keys,
        vals: arr
      });
    }
  },
  sendStrategy: function () {
    if (document.hasFocus() === false) {
      //sd.log('sendStrategy call, but this tab/window is inactive');
      return false;
    }
    //定时发送和次数发送，都存在页面打开没及时发送的问题，所以优化如果是profile和pageview则触发发送
    //次数发送存在不满足次数，永远发送不了的问题，所以选择定时发送
    var data = this.readStore();
    if (data.keys.length > 0 && this.sendingData === 0) {
      this.sendingData = 1;
      this.sendPrepare(data);
    }
  },
  batchInterval: function () {
    var me = this;
    setInterval(function () {
      me.sendStrategy();
    }, sd.para.batch_send.send_interval);
  },
  readStore: function () {
    var keys = [];
    var vals = [];
    var obj = {};
    var val = null;
    var now = new Date().getTime();
    var len = localStorage.length;
    var pendingItems = this.getPendingItems();
    for (var i = 0; i < len; i++) {
      var itemName = localStorage.key(i);
      if (itemName.indexOf('sawebjssdk-') === 0 && /^sawebjssdk\-\d+$/.test(itemName)) {
        if (pendingItems.length && _.indexOf(pendingItems, itemName) > -1) {
          continue;
        }
        val = localStorage.getItem(itemName);
        if (val) {
          val = _.safeJSONParse(val);
          if (val && _.isObject(val)) {
            val._flush_time = now;
            keys.push(itemName);
            vals.push(val);
          } else {
            localStorage.removeItem(itemName);
            sd.log('localStorage-数据parse异常' + val);
          }
        } else {
          localStorage.removeItem(itemName);
          sd.log('localStorage-数据取值异常' + val);
        }
      }
    }
    return {
      keys: keys,
      vals: vals
    };
  },
  writeStore: function (data) {
    var uuid = String(_.getRandom()).slice(2, 5) + String(_.getRandom()).slice(2, 5) + String(new Date().getTime()).slice(3);
    localStorage.setItem('sawebjssdk-' + uuid, JSON.stringify(data));
  }
};

sd.batchSend = new BatchSend();

// 各种发送方式
var dataSend = {};

dataSend.getSendUrl = function (url, data) {
  var base64Data = _.base64Encode(data);
  var crc = 'crc=' + _.hashCode(base64Data);
  if (url.indexOf('?') !== -1) {
    return url + '&data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
  } else {
    return url + '?data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
  }
};

dataSend.getSendData = function (data) {
  var base64Data = _.base64Encode(data);
  var crc = 'crc=' + _.hashCode(base64Data);
  return 'data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
};

dataSend.getInstance = function (data) {
  var sendType = this.getSendType(data);
  var obj = new this[sendType](data);
  // 代理模式，重置原方法，统一设置超时
  var start = obj.start;
  obj.start = function () {
    if (_.isObject(sd.para.is_debug) && sd.para.is_debug.storage && sd.store.requests) {
      sd.store.requests.push({
        name: this.server_url,
        initiatorType: this.img ? 'img' : 'xmlhttprequest', // todo: beacon
        entryType: 'resource',
        requestData: this.data
      });
    }
    var me = this;
    start.apply(this, arguments);
    setTimeout(function () {
      me.isEnd(true);
    }, sd.para.callback_timeout);
  };
  obj.end = function () {
    this.callback && this.callback();
    var self = this;
    setTimeout(function () {
      self.lastClear && self.lastClear();
    }, sd.para.datasend_timeout - sd.para.callback_timeout);
  };
  obj.isEnd = function (isDelay) {
    if (!this.received) {
      this.received = true;
      this.end();
      var self = this;
      if (isDelay) {
        if (sd.para.queue_timeout - sd.para.callback_timeout <= 0) {
          self.close();
        } else {
          setTimeout(function () {
            self.close();
          }, sd.para.queue_timeout - sd.para.callback_timeout);
        }
      } else {
        self.close();
      }
    }
  };

  return obj;
};

dataSend.getRealtimeInstance = function (data) {
  var sendType = this.getSendType(data);
  var obj = new this[sendType](data);
  obj.defaultData = data;
  // 代理模式，重置原方法，统一设置超时
  var start = obj.start;
  obj.start = function () {
    var me = this;
    start.apply(this, arguments);
    setTimeout(function () {
      me.isEnd(true);
    }, sd.para.callback_timeout);
  };
  obj.end = function () {
    this.callback && this.callback();
    var self = this;
    setTimeout(function () {
      self.lastClear && self.lastClear();
    }, sd.para.datasend_timeout - sd.para.callback_timeout);
  };
  obj.isEnd = function (isDelay) {
    if (!this.received) {
      this.received = true;
      this.end();
    }
  };
  return obj;
};

dataSend.getSendType = function (data) {
  var supportedSendTypes = ['image', 'ajax', 'beacon'];
  var sendType = supportedSendTypes[0];

  if (data.config && _.indexOf(supportedSendTypes, data.config.send_type) > -1) {
    sendType = data.config.send_type;
  } else {
    sendType = sd.para.send_type;
  }

  if (sendType === 'beacon' && _.isSupportBeaconSend() === false) {
    sendType = 'image';
  }

  if (sendType === 'ajax' && _.isSupportCors() === false) {
    sendType = 'image';
  }

  return sendType;
};

dataSend.image = function (para) {
  this.callback = para.callback;
  this.img = document.createElement('img');
  this.img.width = 1;
  this.img.height = 1;
  // 如果后端没有配置 access-allow-origin 会导致请求错误
  if (sd.para.img_use_crossorigin) {
    this.img.crossOrigin = 'anonymous';
  }
  this.data = para.data;
  this.server_url = dataSend.getSendUrl(para.server_url, para.data);
};
dataSend.image.prototype.start = function () {
  var me = this;
  if (sd.para.ignore_oom) {
    this.img.onload = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
    this.img.onerror = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
    this.img.onabort = function () {
      this.onload = null;
      this.onerror = null;
      this.onabort = null;
      me.isEnd();
    };
  }
  this.img.src = this.server_url;
};

dataSend.image.prototype.lastClear = function () {
  this.img.src = '';
};

dataSend.ajax = function (para) {
  this.callback = para.callback;
  this.server_url = para.server_url;
  this.data = dataSend.getSendData(para.data);
};
dataSend.ajax.prototype.start = function () {
  var me = this;
  _.ajax({
    url: this.server_url,
    type: 'POST',
    data: this.data,
    credentials: false,
    timeout: sd.para.datasend_timeout,
    cors: true,
    success: function () {
      me.isEnd();
    },
    error: function () {
      me.isEnd();
    }
  });
};

dataSend.beacon = function (para) {
  this.callback = para.callback;
  this.server_url = para.server_url;
  this.data = dataSend.getSendData(para.data);
};

dataSend.beacon.prototype.start = function () {
  var me = this;
  if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
    alert(this.data)
    if (!navigator.sendBeacon(this.server_url, this.data)) {
      alert(1)
      this.defaultData.config.send_type = 'image';
      sendState.realtimeSend(this.defaultData);
    }
  }
  setTimeout(function () {
    me.isEnd();
  }, 40);
};

// 数据发送流程控制

var sendState = {};
sd.sendState = sendState;
sd.events = new _.eventEmitter();
// 发送队列
sendState.queue = _.autoExeQueue();

sendState.getSendCall = function (data, config, callback) {
  // 点击图渲染模式不发数据
  if (sd.is_heatmap_render_mode) {
    return false;
  }

  if (sd.readyState.state < 3) {
    sd.log('初始化没有完成');
    return false;
  }

  data._track_id = Number(String(_.getRandom()).slice(2, 5) + String(_.getRandom()).slice(2, 4) + String(new Date().getTime()).slice(-4));
  if (sd.para.use_client_time) {
    data._flush_time = new Date().getTime();
  }

  var originData = data;

  data = JSON.stringify(data);
  //sd.log(originData);

  var requestData = {
    data: originData,
    config: config,
    callback: callback
  };

  sd.events.tempAdd('send', originData);

  if (!sd.para.app_js_bridge && sd.para.batch_send && localStorage.length < 200) {
    sd.log(originData);
    sd.batchSend.add(requestData.data);
    return false;
  }

  sd.bridge.dataSend(requestData, this, callback);

  sd.log(originData);
};

sendState.prepareServerUrl = function (requestData) {
  if (typeof requestData.config === 'object' && requestData.config.server_url) {
    this.sendCall(requestData, requestData.config.server_url, requestData.callback);
  } else if (_.isArray(sd.para.server_url) && sd.para.server_url.length) {
    for (var i = 0; i < sd.para.server_url.length; i++) {
      this.sendCall(requestData, sd.para.server_url[i]);
    }
  } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
    this.sendCall(requestData, sd.para.server_url, requestData.callback);
  } else {
    sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
  }
};

sendState.sendCall = function (requestData, server_url, callback) {
  var data = {
    server_url: server_url,
    data: JSON.stringify(requestData.data),
    callback: callback,
    config: requestData.config
  };
  if (_.isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && typeof sd.para.jsapp.setData === 'function') {
    delete data.callback;
    data = JSON.stringify(data);
    sd.para.jsapp.setData(data);
  } else {
    if (sd.para.use_client_time) {
      this.realtimeSend(data);
    } else {
      this.pushSend(data);
    }
  }
};

sendState.pushSend = function (data) {
  var instance = dataSend.getInstance(data);
  var me = this;
  instance.close = function () {
    me.queue.close();
  };
  this.queue.enqueue(instance);
};

sendState.realtimeSend = function (data) {
  var instance = dataSend.getRealtimeInstance(data);
  instance.start();
};

var saEvent = {};
sd.saEvent = saEvent;

saEvent.checkOption = {
  // event和property里的key要是一个合法的变量名，由大小写字母、数字、下划线和$组成，并且首字符不能是数字。
  regChecks: {
    regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
  },
  checkPropertiesKey: function (obj) {
    var me = this,
      flag = true;
    _.each(obj, function (content, key) {
      if (!me.regChecks.regName.test(key)) {
        flag = false;
      }
    });
    return flag;
  },
  check: function (a, b) {
    if (typeof this[a] === 'string') {
      return this[this[a]](b);
    } else if (_.isFunction(this[a])) {
      return this[a](b);
    }
  },
  str: function (s) {
    if (!_.isString(s)) {
      sd.log('请检查参数格式,必须是字符串');
      //return false;
      return true;
    } else {
      return true;
    }
  },
  properties: function (p) {
    _.strip_sa_properties(p);
    if (p) {
      if (_.isObject(p)) {
        if (this.checkPropertiesKey(p)) {
          return true;
        } else {
          sd.log('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
          //return false;
          return true;
        }
      } else {
        sd.log('properties可以没有，但有的话必须是对象');
        return true;
        //return false;
      }
    } else {
      return true;
    }
  },
  propertiesMust: function (p) {
    _.strip_sa_properties(p);
    if (p === undefined || !_.isObject(p) || _.isEmptyObject(p)) {
      sd.log('properties必须是对象且有值');
      return true;
      //return false;
    } else {
      if (this.checkPropertiesKey(p)) {
        return true;
      } else {
        sd.log('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
        return true;
        //return false;
      }
    }
  },
  // event要检查name
  event: function (s) {
    if (!_.isString(s) || !this['regChecks']['regName'].test(s)) {
      sd.log('请检查参数格式，eventName 必须是字符串，且需是合法的变量名，即不能以数字开头，且只包含：大小写字母、数字、下划线和 $,其中以 $ 开头的表明是系统的保留字段，自定义事件名请不要以 $ 开头');
      //return false;
      return true;
    } else {
      return true;
    }
  },
  test_id: 'str',
  group_id: 'str',
  distinct_id: function (id) {
    if (_.isString(id) && /^.{1,255}$/.test(id)) {
      return true;
    } else {
      sd.log('distinct_id必须是不能为空，且小于255位的字符串');
      return false;
    }
  }
};

saEvent.check = function (p) {
  var flag = true;
  for (var i in p) {
    if (Object.prototype.hasOwnProperty.call(p, i) && !this.checkOption.check(i, p[i])) {
      return false;
    }
  }
  return flag;
};

saEvent.send = function (p, callback) {
  var data = {
    distinct_id: store.getDistinctId(),
    lib: {
      $lib: 'js',
      $lib_method: 'code',
      $lib_version: String(sd.lib_version)
    },
    properties: {}
  };

  if (_.isObject(p) && _.isObject(p.properties) && !_.isEmptyObject(p.properties) && p.properties.$lib_detail) {
    data.lib.$lib_detail = p.properties.$lib_detail;
    delete p.properties.$lib_detail;
  }
  //debugger;
  _.extend(data, sd.store.getUnionId(), p);

  // 合并properties里的属性
  if (_.isObject(p.properties) && !_.isEmptyObject(p.properties)) {
    _.extend(data.properties, p.properties);
  }
  /*
  // 合并lib里的属性
  if (_.isObject(callback)) {
    _.extend(data.lib, callback);
  }
  */

  // profile时不传公用属性
  if (!p.type || p.type.slice(0, 7) !== 'profile') {
    // 传入的属性 > 当前页面的属性 > session的属性 > cookie的属性 > 预定义属性

    data.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, data.properties);
    if (sd.para.preset_properties.latest_referrer && !_.isString(data.properties.$latest_referrer)) {
      data.properties.$latest_referrer = '取值异常';
      // TODO
      // Do NOT send data here, it will cause too much recursion.
      //_.jssdkDebug(data.properties,store.getProps());
      //sd.debug.jssdkDebug(data.properties, store.getProps());
    }
    if (sd.para.preset_properties.latest_search_keyword && !_.isString(data.properties.$latest_search_keyword)) {
      data.properties.$latest_search_keyword = '取值异常';
    }
    if (sd.para.preset_properties.latest_traffic_source_type && !_.isString(data.properties.$latest_traffic_source_type)) {
      data.properties.$latest_traffic_source_type = '取值异常';
    }
    if (sd.para.preset_properties.latest_landing_page && !_.isString(data.properties.$latest_landing_page)) {
      data.properties.$latest_landing_page = '取值异常';
    }
    if (sd.para.preset_properties.latest_wx_ad_click_id === 'not_collect') {
      delete data.properties._latest_wx_ad_click_id;
      delete data.properties._latest_wx_ad_hash_key;
      delete data.properties._latest_wx_ad_callbacks;
    } else if (sd.para.preset_properties.latest_wx_ad_click_id && !_.isString(data.properties._latest_wx_ad_click_id)) {
      data.properties._latest_wx_ad_click_id = '取值异常';
      data.properties._latest_wx_ad_hash_key = '取值异常';
      data.properties._latest_wx_ad_callbacks = '取值异常';
    }
    if (_.isString(data.properties._latest_wx_ad_click_id)) {
      data.properties.$url = _.isDecodeURI(sd.para.url_is_decode, window.location.href);
    }
  }

  // 如果$time是传入的就用，否则使用服务端时间
  if (data.properties.$time && _.isDate(data.properties.$time)) {
    data.time = data.properties.$time * 1;
    delete data.properties.$time;
  } else {
    if (sd.para.use_client_time) {
      data.time = new Date() * 1;
    }
  }
  // Parse super properties that added by registerPage()
  _.parseSuperProperties(data);

  _.filterReservedProperties(data.properties);
  _.searchObjDate(data);
  _.searchObjString(data);
  // 兼容灼洲app端做的$project和$token而加的代码
  _.searchZZAppStyle(data);

  //去掉data里的$option
  var data_config = _.searchConfigData(data.properties);

  //判断是否要给数据增加新用户属性
  saNewUser.checkIsAddSign(data);
  saNewUser.checkIsFirstTime(data);

  sd.addReferrerHost(data);
  sd.addPropsHook(data);

  if (sd.para.debug_mode === true) {
    sd.log(data);
    this.debugPath(JSON.stringify(data), callback);
  } else {
    sd.sendState.getSendCall(data, data_config, callback);
  }
};

// 发送debug数据请求
saEvent.debugPath = function (data, callback) {
  var _data = data; //存数据
  var url = '';
  if (sd.para.debug_mode_url.indexOf('?') !== -1) {
    url = sd.para.debug_mode_url + '&data=' + encodeURIComponent(_.base64Encode(data));
  } else {
    url = sd.para.debug_mode_url + '?data=' + encodeURIComponent(_.base64Encode(data));
  }

  _.ajax({
    url: url,
    type: 'GET',
    cors: true,
    header: { 'Dry-Run': String(sd.para.debug_mode_upload) },
    success: function (data) {
      // debug 模式下 提示框
      _.isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
    }
  });
};
;

/*
cookie的数据存储
初始化cookie里的distinct_id
*/

var store = (sd.store = {
  requests: [],
  _sessionState: {},
  _state: {
    distinct_id: '',
    first_id: '',
    props: {}
  },
  getProps: function () {
    return this._state.props || {};
  },
  getSessionProps: function () {
    return this._sessionState;
  },
  getDistinctId: function () {
    return this._state._distinct_id || this._state.distinct_id;
  },
  getUnionId: function () {
    var obj = {};
    var firstId = this._state._first_id || this._state.first_id,
      distinct_id = this._state._distinct_id || this._state.distinct_id;
    if (firstId && distinct_id) {
      obj.login_id = distinct_id;
      obj.anonymous_id = firstId;
    } else {
      obj.anonymous_id = distinct_id;
    }
    return obj;
  },
  getFirstId: function () {
    return this._state._first_id || this._state.first_id;
  },
  toState: function (ds) {
    var state = null;
    if (ds != null && _.isJSONString(ds)) {
      state = JSON.parse(ds);
      this._state = _.extend(state);
      if (state.distinct_id) {
        if (typeof state.props === 'object') {
          for (var key in state.props) {
            if (typeof state.props[key] === 'string') {
              state.props[key] = state.props[key].slice(0, sd.para.max_referrer_string_length);
            }
          }
          this.save();
        }
      } else {
        this.set('distinct_id', _.UUID());
        sd.debug.distinct_id('1', ds);
      }
    } else {
      this.set('distinct_id', _.UUID());
      sd.debug.distinct_id('2', ds);
    }
  },
  initSessionState: function () {
    var ds = _.cookie.get('sensorsdata2015session');
    var state = null;
    if (ds !== null && typeof (state = JSON.parse(ds)) === 'object') {
      this._sessionState = state || {};
    }
  },

  setOnce: function (a, b) {
    if (!(a in this._state)) {
      this.set(a, b);
    }
  },
  set: function (name, value) {
    this._state = this._state || {};
    var pre_id = this._state.distinct_id;
    this._state[name] = value;
    // 如果set('first_id') 或者 set('distinct_id')，删除对应的临时属性
    if (name === 'first_id') {
      delete this._state._first_id;
    } else if (name === 'distinct_id') {
      delete this._state._distinct_id;
    }
    this.save();
    //之前distinctid有值视为change
    if (name === 'distinct_id' && pre_id) {
      sd.events.tempAdd('changeDistinctId', value);
    }
  },
  // 针对当前页面修改
  change: function (name, value) {
    // 为临时属性名增加前缀 _ (下划线)
    this._state['_' + name] = value;
  },
  setSessionProps: function (newp) {
    var props = this._sessionState;
    _.extend(props, newp);
    this.sessionSave(props);
  },
  setSessionPropsOnce: function (newp) {
    var props = this._sessionState;
    _.coverExtend(props, newp);
    this.sessionSave(props);
  },
  setProps: function (newp, isCover) {
    var props = {};
    if (!isCover) {
      props = _.extend(this._state.props || {}, newp);
    } else {
      props = newp;
    }
    for (var key in props) {
      if (typeof props[key] === 'string') {
        props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
      }
    }
    this.set('props', props);
  },
  setPropsOnce: function (newp) {
    var props = this._state.props || {};
    _.coverExtend(props, newp);
    this.set('props', props);
  },
  clearAllProps: function (arr) {
    this._sessionState = {};
    if (_.isArray(arr) && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (_.isString(arr[i]) && arr[i].indexOf('latest_') === -1 && arr[i] in this._state.props) {
          delete this._state.props[arr[i]];
        }
      }
    } else {
      for (var i in this._state.props) {
        if (i.indexOf('latest_') !== 1) {
          delete this._state.props[i];
        }
      }
    }
    this.sessionSave({});
    this.save();
  },
  sessionSave: function (props) {
    this._sessionState = props;
    _.cookie.set('sensorsdata2015session', JSON.stringify(this._sessionState), 0);
  },
  save: function () {
    // 深拷贝避免修改原对象
    var copyState = JSON.parse(JSON.stringify(this._state));
    // 删除临时属性避免写入cookie
    delete copyState._first_id;
    delete copyState._distinct_id;

    var stateStr = JSON.stringify(copyState);
    if (sd.para.encrypt_cookie) {
      stateStr = _.cookie.encrypt(stateStr);
    }
    _.cookie.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
  },
  getCookieName: function () {
    var sub = '';
    if (sd.para.cross_subdomain === false) {
      try {
        sub = _.URL(location.href).hostname;
      } catch (e) {
        sd.log(e);
      }
      if (typeof sub === 'string' && sub !== '') {
        sub = 'sa_jssdk_2015_' + sub.replace(/\./g, '_');
      } else {
        sub = 'sa_jssdk_2015_root';
      }
    } else {
      sub = 'sensorsdata2015jssdkcross';
    }
    return sub;
  },
  init: function () {
    this.initSessionState();
    var uuid = _.UUID();
    var cross = _.cookie.get(this.getCookieName());
    cross = _.cookie.resolveValue(cross);
    if (cross === null) {
      // null肯定是首次，非null，看是否有distinct_id
      sd.is_first_visitor = true;

      this.set('distinct_id', uuid);
    } else {
      if (!_.isJSONString(cross) || !JSON.parse(cross).distinct_id) {
        sd.is_first_visitor = true;
      }

      this.toState(cross);
    }

    // 如果没有跨域的cookie，且没有当前域cookie，那当前域的cookie和跨域cookie一致
    saNewUser.setDeviceId(uuid);

    //判断新用户
    saNewUser.storeInitCheck();
    saNewUser.checkIsFirstLatest();
  }
});

// 检查是否是新用户（第一次种cookie，且在8个小时内的）
var saNewUser = {
  checkIsAddSign: function (data) {
    if (data.type === 'track') {
      if (_.cookie.getNewUser()) {
        data.properties.$is_first_day = true;
      } else {
        data.properties.$is_first_day = false;
      }
    }
  },
  is_first_visit_time: false,
  checkIsFirstTime: function (data) {
    if (data.type === 'track' && data.event === '$pageview') {
      if (this.is_first_visit_time) {
        data.properties.$is_first_time = true;
        this.is_first_visit_time = false;
      } else {
        data.properties.$is_first_time = false;
      }
    }
  },
  setDeviceId: function (uuid) {
    // deviceid必须跨子域
    var device_id = null;
    var ds = _.cookie.get('sensorsdata2015jssdkcross');
    ds = _.cookie.resolveValue(ds);
    var state = {};
    if (ds != null && _.isJSONString(ds)) {
      state = JSON.parse(ds);
      if (state.$device_id) {
        device_id = state.$device_id;
      }
    }

    device_id = device_id || uuid;

    if (sd.para.cross_subdomain === true) {
      store.set('$device_id', device_id);
    } else {
      state.$device_id = device_id;
      state = JSON.stringify(state);
      if (sd.para.encrypt_cookie) {
        state = _.cookie.encrypt(state);
      }
      _.cookie.set('sensorsdata2015jssdkcross', state, null, true);
    }

    if (sd.para.is_track_device_id) {
      _.info.currentProps.$device_id = device_id;
    }
  },
  storeInitCheck: function () {
    // 如果是新用户，种cookie
    if (sd.is_first_visitor) {
      var date = new Date();
      var obj = {
        h: 23 - date.getHours(),
        m: 59 - date.getMinutes(),
        s: 59 - date.getSeconds()
      };
      _.cookie.set(_.cookie.getCookieName('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
      // 如果是is_first_visit_time，且第一次，那就发数据
      this.is_first_visit_time = true;
    } else {
      // 如果没有这个cookie，肯定不是首日
      if (!_.cookie.getNewUser()) {
        this.checkIsAddSign = function (data) {
          if (data.type === 'track') {
            data.properties.$is_first_day = false;
          }
        };
      }
      // 如果不是第一次打开的用户，肯定不是首次访问
      this.checkIsFirstTime = function (data) {
        if (data.type === 'track' && data.event === '$pageview') {
          data.properties.$is_first_time = false;
        }
      };
    }
  },
  //检查是否是latest
  checkIsFirstLatest: function () {
    var url_domain = _.info.pageProp.url_domain;

    //去除详叔的坑，utm_source相关
    var latest_utms = ['$utm_source', '$utm_medium', '$utm_campaign', '$utm_content', '$utm_term'];
    var props = store.getProps();
    for (var i = 0; i < latest_utms.length; i++) {
      if (latest_utms[i] in props) {
        delete props[latest_utms[i]];
      }
    }
    store.setProps(props, true);

    // 判断最近一次，如果前向地址跟自己域名一致，且cookie中取不到值，认为有异常
    // 最近一次站外前向地址，如果域名不一致，就register为latest

    var latestObj = {};

    if (url_domain === '') {
      url_domain = 'url解析失败';
    }

    // 遍历 preset_properties 配置参数
    _.each(sd.para.preset_properties, function (value, key) {
      // 忽略不以 latest_ 开头的配置项
      if (key.indexOf('latest_') === -1) {
        return false;
      }
      // 得到 latest_ 后面的字符串
      // 例如 utm, traffic_source_type, search_keyword, referrer, referrer_host, landing_page
      key = key.slice(7);
      // 配置值为 true
      if (value) {
        if (key === 'wx_ad_click_id' && value === 'not_collect') {
          return false;
        }
        if (key !== 'utm' && url_domain === 'url解析失败') {
          if (key === 'wx_ad_click_id') {
            latestObj['_latest_wx_ad_click_id'] = 'url的domain解析失败';
            latestObj['_latest_wx_ad_hash_key'] = 'url的domain解析失败';
            latestObj['_latest_wx_ad_callbacks'] = 'url的domain解析失败';
          } else {
            latestObj['$latest_' + key] = 'url的domain解析失败';
          }
        } else if (_.isReferralTraffic(document.referrer)) {
          switch (key) {
            case 'traffic_source_type':
              latestObj['$latest_traffic_source_type'] = _.getSourceFromReferrer();
              break;
            case 'referrer':
              latestObj['$latest_referrer'] = _.isDecodeURI(sd.para.url_is_decode, _.info.pageProp.referrer);
              break;
            case 'search_keyword':
              latestObj['$latest_search_keyword'] = _.getKeywordFromReferrer();
              break;
            case 'landing_page':
              latestObj['$latest_landing_page'] = _.isDecodeURI(sd.para.url_is_decode, location.href);
              break;
            case 'wx_ad_click_id':
              var adObj = _.getWxAdIdFromUrl(location.href);
              latestObj['_latest_wx_ad_click_id'] = adObj.click_id;
              latestObj['_latest_wx_ad_hash_key'] = adObj.hash_key;
              latestObj['_latest_wx_ad_callbacks'] = adObj.callbacks;
              break;
          }
        }
      } else {
        // 如果当前配置是 latest_utm，遍历store._state.props 删除 $latest_utm 和 _latest_ 开头的属性
        if (key === 'utm' && sd.store._state.props) {
          for (var key1 in sd.store._state.props) {
            if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
              delete sd.store._state.props[key1];
            }
          }
          // 如果是非 latest_utm 配置项，从 store._state.props 中删掉此属性
        } else if (sd.store._state.props && '$latest_' + key in sd.store._state.props) {
          delete sd.store._state.props['$latest_' + key];
          //如果配置了 latest_wx_ad_click_id:false 则删除 wx_ad 相关属性
        } else if (key == 'wx_ad_click_id' && sd.store._state.props && value === false) {
          var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
          _.each(wxPro, function (value) {
            if (value in sd.store._state.props) {
              delete sd.store._state.props[value];
            }
          });
        }
      }
    });

    sd.register(latestObj);

    // utm
    if (sd.para.preset_properties.latest_utm) {
      var allUtms = _.info.campaignParamsStandard('$latest_', '_latest_');
      var $utms = allUtms.$utms;
      var otherUtms = allUtms.otherUtms;
      if (!_.isEmptyObject($utms)) {
        sd.register($utms);
      }
      if (!_.isEmptyObject(otherUtms)) {
        sd.register(otherUtms);
      }
    }
  }
};
;

sd.bridge = {
  //H5 校验 server_url（project host）是否通过
  is_verify_success: false,
  initPara: function () {
    var app_js_bridge_default = {
      //is_send:打通失败数据是否由 H5 发送
      is_send: true,
      white_list: [],
      is_mui: false
    };
    if (typeof sd.para.app_js_bridge === 'object') {
      sd.para.app_js_bridge = _.extend({}, app_js_bridge_default, sd.para.app_js_bridge);
    } else if (sd.para.use_app_track === true || sd.para.app_js_bridge === true || sd.para.use_app_track === 'only') {
      if (sd.para.use_app_track_is_send === false || sd.para.use_app_track === 'only') {
        app_js_bridge_default.is_send = false;
      }
      sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
    } else if (sd.para.use_app_track === 'mui') {
      app_js_bridge_default.is_mui = true;
      sd.para.app_js_bridge = _.extend({}, app_js_bridge_default);
    }
    if (sd.para.app_js_bridge.is_send === false) {
      sd.log('设置了 is_send:false,如果打通失败，数据将被丢弃！');
    }
  },
  //初始化是否打通
  initState: function () {
    function checkProjectAndHost(appUrl) {
      function getHostNameAndProject(url) {
        var obj = {
          hostname: '',
          project: ''
        };
        try {
          obj.hostname = _.URL(url).hostname;
          obj.project = _.URL(url).searchParams.get('project') || 'default';
        } catch (e) {
          sd.log(e);
        }
        return obj;
      }
      var appObj = getHostNameAndProject(appUrl);
      var H5Obj = getHostNameAndProject(sd.para.server_url);
      if (appObj.hostname === H5Obj.hostname && appObj.project === H5Obj.project) {
        return true;
      } else {
        if (sd.para.app_js_bridge.white_list.length > 0) {
          for (var i = 0; i < sd.para.app_js_bridge.white_list.length; i++) {
            var urlobj = getHostNameAndProject(sd.para.app_js_bridge.white_list[i]);
            if (urlobj.hostname === appObj.hostname && urlobj.project === appObj.project) {
              return true;
            }
          }
        }
      }
      return false;
    }

    if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
        if (checkProjectAndHost(window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url)) {
          sd.bridge.is_verify_success = true;
        }
      } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
        var app_server_url = window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url();
        if (app_server_url) {
          if (checkProjectAndHost(app_server_url)) {
            sd.bridge.is_verify_success = true;
          }
        }
      }
    }
  },
  initDefineBridgeInfo: function () {
    var resultObj = {
      touch_app_bridge: true,
      verify_success: false
    };

    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
      if (sd.bridge.is_verify_success) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
      if (sd.bridge.is_verify_success) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else if (typeof SensorsData_APP_JS_Bridge === 'object' && ((SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
      if (SensorsData_APP_JS_Bridge.sensorsdata_verify && SensorsData_APP_JS_Bridge.sensorsdata_visual_verify) {
        if (SensorsData_APP_JS_Bridge.sensorsdata_visual_verify(JSON.stringify({ server_url: sd.para.server_url }))) {
          resultObj.verify_success = 'success';
        } else {
          resultObj.verify_success = 'fail';
        }
      } else {
        resultObj.verify_success = 'success';
      }
    } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
      if (sd.bridge.iOS_UA_bridge()) {
        resultObj.verify_success = 'success';
      } else {
        resultObj.verify_success = 'fail';
      }
    } else {
      resultObj.touch_app_bridge = false;
    }

    return resultObj;
  },
  iOS_UA_bridge: function () {
    if (/sensors-verify/.test(navigator.userAgent)) {
      var match = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
      if (match && match[0] && typeof match[1] === 'string' && match[1].split('?').length === 2) {
        match = match[1].split('?');
        var hostname = null;
        var project = null;
        try {
          hostname = _.URL(sd.para.server_url).hostname;
          project = _.URL(sd.para.server_url).searchParams.get('project') || 'default';
        } catch (e) {
          sd.log(e);
        }
        if (hostname && hostname === match[0] && project && project === match[1]) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else if (/sa-sdk-ios/.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  },
  dataSend: function (requestData, that, callback) {
    var originData = requestData.data;
    // 打通app传数据给app
    if (_.isObject(sd.para.app_js_bridge) && !sd.para.app_js_bridge.is_mui) {
      //如果有新版，优先用新版
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage && _.isObject(window.SensorsData_iOS_JS_Bridge) && window.SensorsData_iOS_JS_Bridge.sensorsdata_app_server_url) {
        if (sd.bridge.is_verify_success) {
          window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify({ callType: 'app_h5_track', data: _.extend({ server_url: sd.para.server_url }, originData) }));
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '4.1',
              output: 'all'
            });
            that.prepareServerUrl(requestData);
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_get_server_url && window.SensorsData_APP_New_H5_Bridge.sensorsdata_track) {
        if (sd.bridge.is_verify_success) {
          SensorsData_APP_New_H5_Bridge.sensorsdata_track(JSON.stringify(_.extend({ server_url: sd.para.server_url }, originData)));
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '4.2',
              output: 'all'
            });
            that.prepareServerUrl(requestData);
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else if (typeof SensorsData_APP_JS_Bridge === 'object' && (SensorsData_APP_JS_Bridge.sensorsdata_verify || SensorsData_APP_JS_Bridge.sensorsdata_track)) {
        // 如果有新版方式，优先用新版
        if (SensorsData_APP_JS_Bridge.sensorsdata_verify) {
          // 如果校验通过则结束，不通过则降级改成h5继续发送
          if (!SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(_.extend({ server_url: sd.para.server_url }, originData)))) {
            if (sd.para.app_js_bridge.is_send) {
              sd.debug.apph5({
                data: originData,
                step: '3.1',
                output: 'all'
              });
              that.prepareServerUrl(requestData);
            } else {
              typeof callback === 'function' && callback();
            }
          } else {
            typeof callback === 'function' && callback();
          }
        } else {
          SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(_.extend({ server_url: sd.para.server_url }, originData)));
          typeof callback === 'function' && callback();
        }
      } else if ((/sensors-verify/.test(navigator.userAgent) || /sa-sdk-ios/.test(navigator.userAgent)) && !window.MSStream) {
        var iframe = null;
        if (sd.bridge.iOS_UA_bridge()) {
          iframe = document.createElement('iframe');
          function checkURL(originData){
            var data = JSON.stringify(_.extend({server_url: sd.para.server_url}, originData));
            data = data.replaceAll(/\r\n/g,'');
            data = encodeURIComponent(data);
            return 'sensorsanalytics://trackEvent?event=' + data;
          }
          var newurl = checkURL(originData);
          iframe.setAttribute('src',newurl);
          document.documentElement.appendChild(iframe);
          iframe.parentNode.removeChild(iframe);
          iframe = null;
          typeof callback === 'function' && callback();
        } else {
          if (sd.para.app_js_bridge.is_send) {
            sd.debug.apph5({
              data: originData,
              step: '3.2',
              output: 'all'
            });
            that.prepareServerUrl(requestData);
          } else {
            typeof callback === 'function' && callback();
          }
        }
      } else {
        if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
          sd.debug.apph5({
            data: originData,
            step: '2',
            output: 'all'
          });
          that.prepareServerUrl(requestData);
        } else {
          typeof callback === 'function' && callback();
        }
      }
    } else if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_mui) {
      if (_.isObject(window.plus) && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event) {
        window.plus.SDAnalytics.trackH5Event(data);
        typeof callback === 'function' && callback();
      } else {
        if (_.isObject(sd.para.app_js_bridge) && sd.para.app_js_bridge.is_send === true) {
          that.prepareServerUrl(requestData);
        } else {
          typeof callback === 'function' && callback();
        }
      }
    } else {
      sd.debug.apph5({
        data: originData,
        step: '1',
        output: 'code'
      });
      that.prepareServerUrl(requestData);
    }
  },
  app_js_bridge_v1: function () {
    var app_info = null;
    var todo = null;
    function setAppInfo(data) {
      app_info = data;
      if (_.isJSONString(app_info)) {
        app_info = JSON.parse(app_info);
      }
      if (todo) {
        todo(app_info);
        todo = null;
        app_info = null;
      }
    }
    //android
    function getAndroid() {
      if (typeof window.SensorsData_APP_JS_Bridge === 'object' && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app) {
        app_info = SensorsData_APP_JS_Bridge.sensorsdata_call_app();
        if (_.isJSONString(app_info)) {
          app_info = JSON.parse(app_info);
        }
      }
    }
    //ios
    window.sensorsdata_app_js_bridge_call_js = function (data) {
      setAppInfo(data);
    };
    // 通知iOS
    function calliOS() {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'sensorsanalytics://getAppInfo');
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
      }
    }
    sd.getAppStatus = function (func) {
      calliOS();
      //先获取能直接取到的安卓，ios是异步的不需要操作
      getAndroid();
      // 不传参数，直接返回数据
      if (!func) {
        return app_info;
        app_info = null;
      } else {
        //如果传参数，保存参数。如果有数据直接执行，没数据时保存
        if (app_info === null) {
          todo = func;
        } else {
          func(app_info);
          app_info = null;
        }
      }
    };
  },
  //init中调用，初始化接收app数据的通道，根据数据的type将数据分发到相应模块
  supportAppCallJs: function () {
    window.sensorsdata_app_call_js = function (type, data) {
      if (type in window.sensorsdata_app_call_js.modules) {
        window.sensorsdata_app_call_js.modules[type](data);
      }
    };
    window.sensorsdata_app_call_js.modules = {};
  }
};
/**
 * 通过JSBridge创建业务的通道实例
 * @param {*} obj 实例参数
 * @param {*} obj.type 业务名称，作为和App通信的callType
 * @param {*} obj.app_call_js 接收和处理App数据的方法
 */
sd.JSBridge = function (obj) {
  this.list = {};
  this.type = obj.type;
  this.app_call_js = _.isFunction(obj.app_call_js) ? obj.app_call_js : function () {};
  this.init();
};
//创建该业务接收App数据的模块，接收App数据
sd.JSBridge.prototype.init = function () {
  var that = this;
  if (!window.sensorsdata_app_call_js.modules[this.type]) {
    window.sensorsdata_app_call_js.modules[this.type] = function (data) {
      that.app_call_js(data);
    };
  }
};
//JS发送数据给App
sd.JSBridge.prototype.jsCallApp = function (data) {
  var appData = {
    callType: this.type,
    data: data
  };
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
    window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
  } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
    window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
  } else {
    sd.log('数据发往App失败，App没有暴露bridge');
    return false;
  }
};
//检查App端通道方法是否暴露
sd.JSBridge.prototype.hasAppBridge = function () {
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
    return 'ios';
  } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
    return 'android';
  } else {
    sd.log('App端bridge未暴露');
    return false;
  }
};
/**
 * 双向通道，JS发送数据请求给App，可以设置超时时间与回调
 * @param {*} obj
 * {
 *   data:{},                             //Object，传输给 App 的数据
 *   callback:function(data){},               //Function,App返回响应数据执行的回调
 *   timeout:{
 *      time:2000,                        //可选参数，App响应的超时时间，超时未响应执行timeout.callback函数
 *      callback:function(){}             //Function,App 未在超时时间内返回响应数据执行的超时回调
 *   }
 * }
 */
sd.JSBridge.prototype.requestToApp = function (obj) {
  var that = this;
  var data = _.isObject(obj.data) ? obj.data : {};
  if (!_.isFunction(obj.callback)) {
    obj.callback = function () {};
  }

  if (_.isObject(obj.timeout) && _.isNumber(obj.timeout.time)) {
    if (!_.isFunction(obj.timeout.callback)) {
      obj.timeout.callback = function () {};
    }
    obj.timer = setTimeout(function () {
      obj.timeout.callback();
      delete that.list[key];
    }, obj.timeout.time);
  }
  function getKey() {
    var d = new Date().getTime().toString(16);
    var m = String(_.getRandom()).replace('.', '').slice(1, 8);
    return d + '-' + m;
  }
  var key = getKey();
  this.list[key] = obj;
  var appData = {
    callType: this.type,
    data: data
  };
  appData.data.message_id = key;
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sensorsdataNativeTracker && window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage) {
    window.webkit.messageHandlers.sensorsdataNativeTracker.postMessage(JSON.stringify(appData));
  } else if (_.isObject(window.SensorsData_APP_New_H5_Bridge) && window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app) {
    window.SensorsData_APP_New_H5_Bridge.sensorsdata_js_call_app(JSON.stringify(appData));
  } else {
    sd.log('数据发往App失败，App没有暴露bridge');
    return false;
  }
};
//双向通道，接收App响应，根据message_id执行对应回调
sd.JSBridge.prototype.double = function (data) {
  if (data.message_id) {
    var message = this.list[data.message_id];
    if (message) {
      if (message.timer) {
        clearTimeout(message.timer);
      }
      message.callback(data);
      delete this.list[data.message_id];
    }
  }
};
;

/*
点击图和触达图数据采集的功能
*/

var heatmap = (sd.heatmap = {
  otherTags: [],
  getTargetElement: function(element, e) {
    var that = this;
    var target = element;
    if (typeof target !== 'object') {
      return null;
    }
    if (typeof target.tagName !== 'string') {
      return null;
    }
    var tagName = target.tagName.toLowerCase();
    if (tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html') {
      return null;
    }
    if (!target || !target.parentNode || !target.parentNode.children) {
      return null;
    }

    var parent_ele = target.parentNode;
    var hasA = that.hasElement(e.originalEvent || e);
    var trackAttrs = sd.para.heatmap.track_attr;
    var otherTags = that.otherTags;

    if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea' || _.hasAttributes(target, trackAttrs)) {
      return target;
    } else if (_.indexOf(otherTags, tagName) > - 1) {
      return target;
    } else if (parent_ele.tagName.toLowerCase() === 'button' || parent_ele.tagName.toLowerCase() === 'a' || _.hasAttributes(parent_ele, trackAttrs)) {
      return parent_ele;
    } else if (tagName === 'area' && parent_ele.tagName.toLowerCase() === 'map' && _.ry(parent_ele).prev().tagName && _.ry(parent_ele).prev().tagName.toLowerCase() === 'img') {
      return _.ry(parent_ele).prev();
    } else if (hasA) {
      return hasA;
    } else if (tagName === 'div' && sd.para.heatmap.collect_tags.div && that.isDivLevelValid(target)) {
      var max_level = sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level || 1;
      if (max_level > 1 || that.isCollectableDiv(target)) {
        return target;
      } else {
        return  null;
      }
    } else if (that.isStyleTag(tagName) && sd.para.heatmap.collect_tags.div) {
      var parentTrackDiv = that.getCollectableParent(target);
      if (parentTrackDiv && that.isDivLevelValid(parentTrackDiv)) {
        return parentTrackDiv;
      }
    }
    return null;
  },
  // 两个 div 之间的层级数目
  getDivLevels: function (element, rootElement) {
    var path = heatmap.getElementPath(element, true, rootElement);
    var pathArr = path.split(' > ');
    var ans = 0;
    _.each(pathArr, function(tag) {
      if (tag === 'div') {
        ans++;
      }
    });
    return ans;
  },
  isDivLevelValid: function (element) {
    var max_level = sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level || 1;

    var allDiv = element.getElementsByTagName('div');
    for (var i = allDiv.length - 1; i >= 0; i--) {
      if (heatmap.getDivLevels(allDiv[i], element) > max_level) {
        return false;
      }
    }
    return true;
  },
  // 得到元素的 $element_path
  getElementPath: function (element, ignoreID, rootElement) {
    var names = [];
    while (element.parentNode) {
      if (element.id && !ignoreID && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(element.id)) {
        names.unshift(element.tagName.toLowerCase() + '#' + element.id);
        break;
      } else {
        if (rootElement && element === rootElement) {
          names.unshift(element.tagName.toLowerCase());
          break;
        } else if (element === document.body) {
          names.unshift('body');
          break;
        } else {
          names.unshift(element.tagName.toLowerCase());
        }
        element = element.parentNode;
      }
    }
    return names.join(' > ');
  },
  // 得到元素最近的 li 元素
  getClosestLi: function (element) {
    // 得到符合指定选择器的最近的元素
    var getClosest = function (elem, selector) {
      // Get closest match
      for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
        // If selector is a tag
        if (elem.tagName.toLowerCase() === selector) {
          return elem;
        }
      }
      return null;
    };
    return getClosest(element, 'li');
  },
  // 得到元素的 $element_position 属性
  getElementPosition: function (element, elementPath, ignoreID) {
    var closestLi = sd.heatmap.getClosestLi(element);
    if (!closestLi) {
      return null;
    }
    var tag = element.tagName.toLowerCase();
    var sameTypeTags = closestLi.getElementsByTagName(tag);
    var sameTypeTagsLen = sameTypeTags.length;
    var arr = [];
    // 如果 li 中存在多个相同类型的元素
    if (sameTypeTagsLen > 1) {
      for (var i = 0; i < sameTypeTagsLen; i++) {
        var elepath = sd.heatmap.getElementPath(sameTypeTags[i], ignoreID);
        if (elepath === elementPath) {
          arr.push(sameTypeTags[i]);
        }
      }
      if (arr.length > 1) {
        // 以当前元素在相同类型元素列表中的位置作为 position
        return _.indexOf(arr, element);
      }
    }

    function _getPosition(element) {
      var tagName = element.tagName.toLowerCase();
      var parentNode = element.parentNode;
      if (!parentNode) {
        return '';
      }
      var sameTypeSiblings = _.ry(element).getSameTypeSiblings();
      var typeLen = sameTypeSiblings.length;
      if (typeLen === 1) {
        return 0;
      }
      for (var i = 0, e = element; _.ry(e).previousElementSibling().ele; e = _.ry(e).previousElementSibling().ele, i++);
      return i;
    }
    // 默认以上级 li 的位置作为元素的 position
    return _getPosition(closestLi);
  },
  // 设置错误提示
  setNotice: function (web_url) {
    sd.is_heatmap_render_mode = true;

    if (!sd.para.heatmap) {
      sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
    }
    if (web_url && web_url[0] && web_url[1]) {
      if (web_url[1].slice(0, 5) === 'http:' && location.protocol === 'https:') {
        sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
      }
    }
    if (!sd.para.heatmap_url) {
      sd.para.heatmap_url = location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
    }
  },
  getDomIndex: function (el) {
    if (!el.parentNode) return -1;
    var i = 0;
    var nodeName = el.tagName;
    var list = el.parentNode.children;
    for (var n = 0; n < list.length; n++) {
      if (list[n].tagName === nodeName) {
        if (el === list[n]) {
          return i;
        } else {
          i++;
        }
      }
    }
    return -1;
  },
  selector: function (el) {
    var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
    if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id'))) {
      return '#' + el.getAttribute('id');
    } else {
      return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
    }
  },
  getDomSelector: function (el, arr) {
    if (!el || !el.parentNode || !el.parentNode.children) {
      return false;
    }
    arr = arr && arr.join ? arr : [];
    var name = el.nodeName.toLowerCase();
    if (!el || name === 'body' || 1 != el.nodeType) {
      arr.unshift('body');
      return arr.join(' > ');
    }
    arr.unshift(this.selector(el));
    if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id') return arr.join(' > ');
    return this.getDomSelector(el.parentNode, arr);
  },
  na: function () {
    var a = document.documentElement.scrollLeft || window.pageXOffset;
    return parseInt(isNaN(a) ? 0 : a, 10);
  },
  i: function () {
    var a = 0;
    try {
      (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
    } catch (b) {
      a = 0;
    }
    return parseInt(a, 10);
  },
  getBrowserWidth: function () {
    var a = window.innerWidth || document.body.clientWidth;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getBrowserHeight: function () {
    var a = window.innerHeight || document.body.clientHeight;
    return isNaN(a) ? 0 : parseInt(a, 10);
  },
  getScrollWidth: function () {
    var a = parseInt(document.body.scrollWidth, 10);
    return isNaN(a) ? 0 : a;
  },
  W: function (a) {
    var b = parseInt(+a.clientX + +this.na(), 10);
    var a = parseInt(+a.clientY + +this.i(), 10);
    return {
      x: isNaN(b) ? 0 : b,
      y: isNaN(a) ? 0 : a
    };
  },
  start: function (ev, target, tagName, customProps, callback) {
    var userCustomProps = _.isObject(customProps) ? customProps : {};
    var userCallback = _.isFunction(callback) ? callback : _.isFunction(customProps) ? customProps : undefined;
    if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(target)) {
      return false;
    }

    var selector = this.getDomSelector(target);
    var prop = _.getEleInfo({ target: target });

    prop.$element_selector = selector ? selector : '';
    prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
    var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
    if (_.isNumber(element_position)) {
      prop.$element_position = element_position;
    }
    if (sd.para.heatmap && sd.para.heatmap.custom_property) {
      var customP = sd.para.heatmap.custom_property(target);
      if (_.isObject(customP)) {
        prop = _.extend(prop, customP);
      }
    }
    prop = _.extend(prop, userCustomProps);
    if (tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true) {
      _.trackLink({ event: ev, target: target }, '$WebClick', prop);
    } else {
      sd.track('$WebClick', prop, userCallback);
    }
  },
  hasElement: function (e) {
    var path = e._getPath ? e._getPath() : heatmap.getElementPath(e.target, true).split(' > ');
    if (_.isArray(path) && path.length > 0) {
      for (var i = 0; i < path.length; i++) {
        if (path[i] && path[i].tagName && path[i].tagName.toLowerCase() === 'a') {
          return path[i];
        }
      }
    }
    return false;
  },
  isStyleTag: function (tagname, isVisualMode) {
    var defaultTag = ['a', 'div', 'input', 'button', 'textarea'];
    var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
    if (_.indexOf(defaultTag, tagname) > -1) {
      return false;
    }
    if (isVisualMode && (!sd.para.heatmap || !sd.para.heatmap.collect_tags || !sd.para.heatmap.collect_tags.div)) {
      return _.indexOf(ignore_tags_default, tagname) > -1;
    } else if (_.isObject(sd.para.heatmap) && _.isObject(sd.para.heatmap.collect_tags) && _.isObject(sd.para.heatmap.collect_tags.div) && _.indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, tagname) > -1) {
      return true;
    }
    return false;
  },
  isCollectableDiv: function (target, isVisualMode) {
    try {
      if (target.children.length === 0) {
        return true;
      } else {
        for (var i = 0; i < target.children.length; i++) {
          if (target.children[i].nodeType !== 1) {
            continue;
          }
          var tag = target.children[i].tagName.toLowerCase();
          var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
          if ((tag === 'div' && max_level > 1) || this.isStyleTag(tag, isVisualMode)) {
            if (!this.isCollectableDiv(target.children[i], isVisualMode)) {
              return false;
            }
          } else {
            return false;
          }
        }
        return true;
      }
    } catch (error) {
      sd.log(error);
    }
    return false;
  },
  getCollectableParent: function (target, isVisualMode) {
    try {
      var parent = target.parentNode;
      var parentName = parent ? parent.tagName.toLowerCase() : '';
      if (parentName === 'body') {
        return false;
      }
      var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
      if (parentName && parentName === 'div' && (max_level > 1 || this.isCollectableDiv(parent, isVisualMode))) {
        return parent;
      } else if (parent && this.isStyleTag(parentName, isVisualMode)) {
        return this.getCollectableParent(parent, isVisualMode);
      }
    } catch (error) {
      sd.log(error);
    }
    return false;
  },
  initScrollmap: function () {
    if (!_.isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
      return false;
    }

    /*
    if (sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) {
      return false;
    }
    */
    var checkPage = function () {
      if (sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) {
        return false;
      }
      return true;
    };

    var interDelay = function (param) {
      var interDelay = {};
      interDelay.timeout = param.timeout || 1000;
      interDelay.func = param.func;
      interDelay.hasInit = false;
      interDelay.inter = null;
      interDelay.main = function (para, isClose) {
        this.func(para, isClose);
        this.inter = null;
      };
      interDelay.go = function (isNoDelay) {
        var me = this;
        var para = {};
        if (!this.inter) {
          para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
          para.$viewport_position = Math.round(para.$viewport_position) || 0;
          para.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
          para.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
          //para.$screen_orientation = _.getScreenOrientation();
          //para.$device_pixel_ratio = (isNaN(window.devicePixelRatio) ? 1 : window.devicePixelRatio);
          if (isNoDelay) {
            interDelay.main(para, true);
          } else {
            this.inter = setTimeout(function () {
              interDelay.main(para);
            }, this.timeout);
          }
        }
      };
      return interDelay;
    };

    var delayTime = interDelay({
      timeout: 1000,
      func: function (para, isClose) {
        var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
        var current_time = new Date();
        var delay_time = current_time - this.current_time;
        if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
          para.$url = _.isDecodeURI(sd.para.url_is_decode, location.href);
          para.$title = document.title;
          para.$url_path = location.pathname;
          para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
          sd.track('$WebStay', para);
        }
        this.current_time = current_time;
      }
    });

    delayTime.current_time = new Date();

    _.addEvent(window, 'scroll', function () {
      if (!checkPage()) {
        return false;
      }
      delayTime.go();
    });

    _.addEvent(window, 'unload', function () {
      if (!checkPage()) {
        return false;
      }
      delayTime.go('notime');
    });
  },
  initHeatmap: function () {
    var that = this;
    if (!_.isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
      return false;
    }

    // 验证url，function成功就行，非function认为都是全部
    if (_.isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) {
      return false;
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      sd.para.heatmap.collect_elements = 'all';
    } else {
      sd.para.heatmap.collect_elements = 'interact';
    }

    if (sd.para.heatmap.collect_elements === 'all') {
      _.addEvent(document, 'click', function (e) {
        var ev = e || window.event;
        if (!ev) {
          return false;
        }
        var target = ev.target || ev.srcElement;
        if (typeof target !== 'object') {
          return false;
        }
        if (typeof target.tagName !== 'string') {
          return false;
        }
        var tagName = target.tagName.toLowerCase();
        if (tagName === 'body' || tagName === 'html') {
          return false;
        }
        if (!target || !target.parentNode || !target.parentNode.children) {
          return false;
        }
        var parent_ele = target.parentNode.tagName.toLowerCase();
        if (parent_ele === 'a' || parent_ele === 'button') {
          that.start(ev, target.parentNode, parent_ele);
        } else {
          that.start(ev, target, tagName);
        }
      });
    } else {
      _.addEvent(document, 'click', function (e) {
        var ev = e || window.event;
        if (!ev) {
          return false;
        }
        var target = ev.target || ev.srcElement;
        var theTarget = sd.heatmap.getTargetElement(target, e);
        if (theTarget) {
          that.start(ev, theTarget, theTarget.tagName.toLowerCase());
        }
      });
    }
  }
});
;

sd.init = function (para) {
  // 标志已经init过
  if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
    return false;
  }
  sd.setInitVar();
  sd.readyState.setState(2);
  sd.initPara(para);
  sd.bridge.supportAppCallJs();
  sd.detectMode();

  // iOS Safari
  if (sd._.isIOS() && sd._.getIOSVersion() && sd._.getIOSVersion() < 13) {
    if (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div) {
      sd._.setCssStyle('div, [data-sensors-click] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }');
    }
    if (sd.para.heatmap && sd.para.heatmap.track_attr) {
      sd._.setCssStyle('[' + sd.para.heatmap.track_attr.join('], [') + '] { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }');
    }
  }
};

var methods = ['getAppStatus', 'track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'clearPageRegister'];

_.each(methods, function (method) {
  var oldFunc = sd[method];
  sd[method] = function () {
    if (sd.readyState.state < 3) {
      if (!_.isArray(sd._q)) {
        sd._q = [];
      }
      sd._q.push([method, arguments]);
      return false;
    }
    if (!sd.readyState.getState()) {
      try {
        console.error('请先初始化神策JS SDK');
      } catch (e) {
        sd.log(e);
      }
      return;
    }
    return oldFunc.apply(sd, arguments);
  };
});
;
    // Do not remove the following line!
    sd.modules['Amp'] = (function () {
  'use strict';

  var amp = {
    sd: null,
    init: function (sd) {
      if (this.sd) {
        return false;
      }
      this.sd = sd;
      if (!(this.sd && this.sd._)) {
        return false;
      }
      var amp_id = this.sd._.cookie.get('sensors_amp_id');
      var distinct_id = this.sd.store._state.distinct_id;
      /**
       * 1、没有 ampid ，直接把 distinctid 设置到 ampid
       * 2、有 ampid ，与 distinctid 一致不需要处理
       * 3、有 ampid ，与 distinctid 不一致，ampid 不是 amp- 开头的，代表 js sdk 写入的，不作处理
       * 4、有 ampid ，与 distinctid 不一致，ampid 是 amp- 开头的（amp 生成的 uuid），需要处理：
       *        a。distinctid 是登录 id，tracksignup 做关联，然后把 ampid 设置为 distinctid。amp 和非 amp 都使用 登录 id 作为 id
       *        b。distinctid 是匿名 id，identify 把 ampid 作为 distinctid。amp 和 非amp 都使用 ampuuid 作为匿名 id
       * 5、每次调用 identify 、 login 导致 id cookie 级的变化时都同步设置 ampid
       */
      if (amp_id && amp_id.length > 0) {
        var isAmpUuid = amp_id.slice(0, 4) === 'amp-' ? true : false;
        if (amp_id !== distinct_id) {
          if (!isAmpUuid) {
            return false;
          }
          if (this.sd.store._state.first_id) {
            this.sd.identify(amp_id, true);
            this.sd.saEvent.send(
              {
                original_id: amp_id,
                distinct_id: distinct_id,
                type: 'track_signup',
                event: '$SignUp',
                properties: {}
              },
              null
            );
            this.setAmpId(distinct_id);
          } else {
            this.sd.identify(amp_id, true);
          }
        }
      } else {
        this.setAmpId(distinct_id);
      }
      this.addListener();
    },
    addListener: function () {
      var that = this;
      //id发生cookie级的变化时更新ampid
      this.sd.events.on('changeDistinctId', function (id) {
        that.setAmpId(id);
      });
      this.sd.events.isReady();
    },
    setAmpId: function (id) {
      this.sd._.cookie.set('sensors_amp_id', id);
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.Amp = window.SensorsDataWebJSSDKPlugin.Amp || amp;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      Amp: amp
    };
  }

  return amp;

}());

sd.modules['Channel'] = (function () {
  'use strict';

  var _;
  var sd;
  var Channel = {
    event_list: [],
    latest_event_initial_time: null,
    max_save_time: 1000 * 60 * 60 * 24 * 30,
    init: function (sa) {
      if (sd) {
        return false;
      }
      sd = sa;
      if (!sd) {
        return false;
      }
      _ = sd._;
      if (!_.localStorage.isSupport()) {
        return false;
      }
      //由于 _sa_channel_landing_url 放开属性长度限制
      sd.para.max_string_length = 1024;
      this.eventList.init();
      this.addLatestChannelUrl();
      this.addIsChannelCallbackEvent();
    },

    addIsChannelCallbackEvent: function () {
      sd.registerPage({
        $is_channel_callback_event: function (data) {
          if (data.event) {
            if (!(data.event === '$WebClick' || data.event === '$pageview' || data.event === '$WebStay' || data.event === '$SignUp')) {
              if (Channel.eventList.hasEvent(data.event)) {
                return false;
              } else {
                Channel.eventList.add(data.event);
                return true;
              }
            }
          }
        }
      });
    },
    addLatestChannelUrl: function () {
      var url_domain = this.getUrlDomain();
      var cookie_prop = this.cookie.getChannel();
      if (url_domain === 'url解析失败') {
        this.registerAndSave({
          _sa_channel_landing_url: '',
          _sa_channel_landing_url_error: 'url的domain解析失败'
        });
      } else if (_.isReferralTraffic(document.referrer)) {
        var channel_sign = _.getQueryParam(location.href, 'sat_cf');
        if (_.isString(channel_sign) && channel_sign.length > 0) {
          this.registerAndSave({
            _sa_channel_landing_url: location.href
          });
          Channel.channelLinkHandler();
        } else {
          this.registerAndSave({
            _sa_channel_landing_url: ''
          });
        }
      } else {
        if (!cookie_prop) {
          sd.registerPage({
            _sa_channel_landing_url: '',
            _sa_channel_landing_url_error: '取值异常'
          });
        } else {
          sd.registerPage(cookie_prop);
        }
      }
    },
    //registerpage 注册为公共属性，并且存在 cookie 里
    registerAndSave: function (prop) {
      sd.registerPage(prop);
      this.cookie.saveChannel(prop);
    },
    cookie: {
      getChannel: function () {
        var value;
        try {
          value = JSON.parse(_.cookie.get('sensorsdata2015jssdkchannel'));
        } catch (error) {
          sd.log(error);
        }
        return _.isObject(value) && value.prop ? value.prop : false;
      },
      saveChannel: function (obj) {
        var data = {
          prop: obj
        };
        _.cookie.set('sensorsdata2015jssdkchannel', JSON.stringify(data));
      }
    },
    channelLinkHandler: function () {
      this.eventList.reset();
      sd.track('$ChannelLinkReaching');
    },
    getUrlDomain: function () {
      var url_domain = _.info.pageProp.url_domain;
      if (url_domain === '') {
        url_domain = 'url解析失败';
      }
      return url_domain;
    },
    eventList: {
      init: function () {
        var data = this.get();
        var now_time = new Date().getTime();
        if (data && _.isNumber(data.latest_event_initial_time) && _.isArray(data.eventList)) {
          var duration = now_time - data.latest_event_initial_time;
          if (duration > 0 && duration < Channel.max_save_time) {
            Channel.event_list = data.eventList;
            Channel.latest_event_initial_time = data.latest_event_initial_time;
          } else {
            this.reset();
          }
        } else {
          this.reset();
        }
      },
      get: function () {
        var data = {};
        try {
          data = JSON.parse(_.localStorage.get('sawebjssdkchannel'));
        } catch (error) {
          sd.log(error);
        }
        return data;
      },
      add: function (name) {
        Channel.event_list.push(name);
        this.save();
      },
      save: function () {
        var obj = {
          latest_event_initial_time: Channel.latest_event_initial_time,
          eventList: Channel.event_list
        };
        _.localStorage.set('sawebjssdkchannel', JSON.stringify(obj));
      },
      /**
       * 重置 eventlist
       * 1、初次使用，初始化数据
       * 2、解析到新的渠道链接
       * 3、渠道链接 30 日未更新
       * 4、保存的数据出现异常
       */
      reset: function () {
        Channel.event_list = [];
        Channel.latest_event_initial_time = new Date().getTime();
        this.save();
      },
      hasEvent: function (name) {
        var result = false;
        _.each(Channel.event_list, function (item) {
          if (item === name) {
            result = true;
          }
        });
        return result;
      }
    }
  };

  if (window.SensorsDataWebJSSDKPlugin && Object.prototype.toString.call(window.SensorsDataWebJSSDKPlugin) === '[object Object]') {
    window.SensorsDataWebJSSDKPlugin.SensorsChannel = window.SensorsDataWebJSSDKPlugin.SensorsChannel || Channel;
  } else {
    window.SensorsDataWebJSSDKPlugin = {
      SensorsChannel: Channel
    };
  }

  return Channel;

}());

sd.modules['Deeplink'] = (function () {
  'use strict';

  var hidden;
  var isWechat = /micromessenger\/([\d.]+)/i.test(navigator.userAgent || '');
  var getSupportedProperty = function getSupportedProperty() {
    var result = {};

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      result.hidden = 'hidden';
      result.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      result.hidden = 'msHidden';
      result.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      result.hidden = 'webkitHidden';
      result.visibilityChange = 'webkitvisibilitychange';
    }

    return result;
  };

  function isPageHidden() {
    if (typeof hidden === 'undefined') return false;
    return document[hidden];
  }

  hidden = getSupportedProperty().hidden;
  var OSs = {
    android: /Android/i,
    iOS: /iPhone|iPad|iPod/i
  };

  var getOS = function getOS() {
    for (var key in OSs) {
      if (navigator.userAgent.match(OSs[key])) {
        return key;
      }
    }

    return '';
  }; // Only Chrome for android supports app links on Android.

  var currentOS = getOS();
  var isSupportedOS = function isSupportedOS() {
    return OSs.hasOwnProperty(currentOS);
  };
  var isObject = function isObject(obj) {
    if (obj == null) {
      return false;
    } else {
      return Object.prototype.toString.call(obj) == '[object Object]';
    }
  };
  var parseShortURL = function parseShortURL(url) {
    var urlRegexp = /\/sd\/(\w+)\/(\w+)$/;
    return url.match(urlRegexp);
  };
  var parseAPIURL = function parseAPIURL(sd) {
    var urlParts = sd._.URL(sd.para.server_url);

    return {
      origin: urlParts.origin,
      project: urlParts.searchParams.get('project') || 'default'
    };
  };
  var handleAndroidLinks = function handleAndroidLinks(dp,
  /* deepLink, */
  scheme, downloadURL) {
    dp.log('尝试唤起 android app'); //const dest = (isNativeChrome() && deepLink) ? deepLink : scheme;//若app已安装会打开app

    var dest = scheme; // TODO: only schemes are supported at present.

    dp.log('唤起APP的地址：' + dest);
    window.location = dest;
    dp.timer = setTimeout(function () {
      // 如果app未安装会执行这个定时器，否则不会执行
      var pageHidden = isPageHidden();
      dp.log('hide:' + hidden + ':' + document[hidden]);

      if (pageHidden) {
        dp.log('The page is hidden, stop navigating to download page');
        return false;
      }

      dp.log('App可能未安装，跳转到下载地址'); // 跳转至 app 下载页面

      window.location = downloadURL;
    }, dp.timeout);
  };
  var handleIOSLinks = function handleIOSLinks(dp, deepLink, downloadURL) {
    dp.log('尝试唤起 iOS app:' + deepLink);
    window.location.href = deepLink; //若app已安装会打开app

    dp.timer = setTimeout(function () {
      // 如果app未安装会执行这个定时器，否则不会执行
      var pageHidden = isPageHidden();

      if (pageHidden) {
        dp.log('The page is hidden, stop navigating to download page');
        return false;
      }

      dp.log('App可能未安装，跳转到下载地址'); // 跳转至 app 下载页面

      window.location.href = downloadURL;
    }, dp.timeout);
    dp.log('new timer:' + dp.timer);
  };

  var SADeepLink = {
    key: null,
    timer: null,
    sd: null,
    data: null,
    timeout: 2500,
    apiURL: "{origin}/sdk/deeplink/param?key={key}&system_type=JS&project={project}",
    init: function init() {
      if (this.sd) {
        this.log('deeplink已经初始化');
        return false;
      }

      if (isObject(sensorsDataAnalytic201505)) {
        this.sd = sensorsDataAnalytic201505;
      }

      this.log('init()');

      if (this.sd === null) {
        this.log('神策JS SDK未成功引入');
        return false;
      }
      /**
       * 根据参数个数适配不同的引入方式
       * 1、useAppPlugin方式：init(option)
       * 2、sd.use方式：init（sd,option)
       */


      var options = {};

      if (arguments.length > 0) {
        if (arguments.length === 1 && isObject(arguments[0])) {
          options = arguments[0];
        } else if (arguments.length >= 2 && isObject(arguments[1])) {
          options = arguments[1];
        }
      } // 检查当前操作系统是否支持，目前只支持 Android 和 iOS


      if (!isSupportedOS()) {
        this.log('不支持当前系统，目前只支持Android和iOS');
        return false;
      }

      if (isObject(options) && this.sd._.isNumber(options.timeout)) {
        if (options.timeout >= 2500) {
          this.timeout = options.timeout;
        }
      }

      if (!this.sd.para.server_url) {
        this.log('神策JS SDK配置项server_url未正确配置');
        return false;
      }

      var serverInfo = parseAPIURL(this.sd);

      this.apiURL = this.apiURL.replace('{origin}', serverInfo.origin).replace('{project}', serverInfo.project); // 检查落地页 URL 是否含有 deeplink 参数，若无则停止处理

      var deeplinkParam = this.sd._.URL(window.location.href).searchParams.get('deeplink');

      if (!deeplinkParam) {
        this.log('当前页面缺少deeplink参数');
        return false;
      } // 检查解码后的 deeplink 参数值是否符合规范，若不符合要求则停止处理


      deeplinkParam = window.decodeURIComponent(deeplinkParam);

      var shortURLParams = parseShortURL(deeplinkParam);

      if (!shortURLParams) {
        this.log('当前页面的deeplink参数无效');
        return false;
      }

      this.key = shortURLParams[2];
      this.apiURL = this.apiURL.replace('{key}', window.encodeURIComponent(shortURLParams[2])); // 从神策服务器查询深层链接信息

      this.sd._.ajax({
        url: this.apiURL,
        type: 'GET',
        cors: true,
        //timeout: 5000,
        credentials: false,
        success: function (data) {
          // 没有找到指定 key 的 deeplink 数据，停止处理
          if (data.errorMsg) {
            SADeepLink.log('API报错：' + data.errorMsg);
            return false;
          }

          SADeepLink.data = data;
          SADeepLink.log('API查询成功，数据：' + JSON.stringify(data, null, '  '));

          if (this.data.app_key) {
            if (this.data.android_info && this.data.android_info.url_schemes) {
              this.data.android_info.url_schemes += '://sensorsdata/sd/' + this.data.app_key + '/' + this.key;
            }

            if (this.data.ios_info && this.data.ios_info.url_schemes) {
              this.data.ios_info.url_schemes += '://sensorsdata/sd/' + this.data.app_key + '/' + this.key;
            }
          }
        }.bind(this),
        error: function error(e) {
          SADeepLink.log('API查询出错');
        }
      });

      this.addListeners();
    },
    openDeepLink: function openDeepLink() {
      this.log('openDeeplink()');

      if (!this.data) {
        this.log('没有Deep link数据!');
        return false;
      }

      if (currentOS === 'iOS') {
        this.log('当前系统是iOS');
        var appURL = this.sd && this.sd._ && this.sd._.getIOSVersion() >= 9 && this.data.ios_info.ios_wake_url ? this.data.ios_info.ios_wake_url : this.data.ios_info.url_schemes; // TODO, this.data.ios_info.deeplink_url ||
        // const appURL = (_.isWechat && this.data.ios_info.deeplink_url) ? this.data.ios_info.deeplink_url : this.data.ios_info.url_schemes;

        this.log('唤起APP的地址：' + appURL);

        handleIOSLinks(this, appURL, this.data.ios_info.download_url);
      } else {
        this.log('当前系统是 android');

        handleAndroidLinks(this, this.data.android_info.url_schemes, this.data.android_info.download_url);
      }
    },
    log: function log(message) {
      if (this.sd) {
        this.sd.log(message);
      }
    },
    addListeners: function addListeners() {
      var visibilityName = getSupportedProperty().visibilityChange;

      if (visibilityName) {
        document.addEventListener(visibilityName, function () {
          clearTimeout(this.timer);
          this.log('visibilitychange, clear timeout:' + this.timer);
        }.bind(this), false);
      }

      window.addEventListener('pagehide', function () {
        this.log('page hide, clear timeout:' + this.timer);
        clearTimeout(this.timer);
      }.bind(this), false);
    }
  };

  if (!isObject(window.SensorsDataWebJSSDKPlugin)) {
    window.SensorsDataWebJSSDKPlugin = {
      Deeplink: SADeepLink,
      deeplink: SADeepLink
    };
  } else {
    window.SensorsDataWebJSSDKPlugin.Deeplink = window.SensorsDataWebJSSDKPlugin.Deeplink || SADeepLink;
    window.SensorsDataWebJSSDKPlugin.deeplink = window.SensorsDataWebJSSDKPlugin.deeplink || SADeepLink;
  }

  return SADeepLink;

}());

sd.modules['SiteLinker'] = (function () {
  'use strict';

  var siteLinker = {};

  // 检查指定URL是否匹配打通规则
  siteLinker.getPart = function (part) {
    var temp = false;
    var len = this.option.length;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return true;
        }
      }
    }
    return temp;
  };

  siteLinker.getPartHash = function (part) {
    var len = this.option.length;
    var temp = false;
    if (len) {
      for (var i = 0; i < len; i++) {
        if (part.indexOf(this.option[i]['part_url']) > -1) {
          return this.option[i]['after_hash'];
        }
      }
    }
    return !!temp;
  };

  // 得到当前页面编码后的 ID
  siteLinker.getCurrenId = function () {
    var distinct_id = this.store.getDistinctId() || '',
      first_id = this.store.getFirstId() || '';
    if (this._.urlSafeBase64 && this._.urlSafeBase64.encode) {
      distinct_id = distinct_id ? this._.urlSafeBase64.trim(this._.urlSafeBase64.encode(_.base64Encode(distinct_id))) : '';
    } else if (this._.rot13obfs) {
      distinct_id = distinct_id ? this._.rot13obfs(distinct_id) : '';
    }
    // 若有 first_id，则格式是 'f' + distinct_id，对应的旧版格式是 'u' + distinct_id
    // 否则格式是 'd' + distinct_id，对应的旧版格式是 'a' + distinct_id
    var urlId = first_id ? 'f' + distinct_id : 'd' + distinct_id;
    return encodeURIComponent(urlId);
  };

  siteLinker.rewireteUrl = function (url, target) {
    var reg = /([^?#]+)(\?[^#]*)?(#.*)?/;
    var arr = reg.exec(url),
      nurl = '';
    if (!arr) {
      return;
    }
    var host = arr[1] || '',
      search = arr[2] || '',
      hash = arr[3] || '';
    var idIndex;
    if (this.getPartHash(url)) {
      idIndex = hash.indexOf('_sasdk');
      var queryIndex = hash.indexOf('?');
      if (queryIndex > -1) {
        if (idIndex > -1) {
          nurl = host + search + '#' + hash.substring(1, idIndex) + '_sasdk=' + this.getCurrenId();
        } else {
          nurl = host + search + '#' + hash.substring(1) + '&_sasdk=' + this.getCurrenId();
        }
      } else {
        nurl = host + search + '#' + hash.substring(1) + '?_sasdk=' + this.getCurrenId();
      }
    } else {
      idIndex = search.indexOf('_sasdk');
      var hasQuery = /^\?(\w)+/.test(search);
      if (hasQuery) {
        if (idIndex > -1) {
          nurl = host + '?' + search.substring(1, idIndex) + '_sasdk=' + this.getCurrenId() + hash;
        } else {
          nurl = host + '?' + search.substring(1) + '&_sasdk=' + this.getCurrenId() + hash;
        }
      } else {
        nurl = host + '?' + search.substring(1) + '_sasdk=' + this.getCurrenId() + hash;
      }
    }

    if (target) {
      target.href = nurl;
    }
    return nurl;
  };

  siteLinker.getUrlId = function () {
    var sa_id = location.href.match(/_sasdk=([aufd][^\?\#\&\=]+)/);
    if (this._.isArray(sa_id) && sa_id[1]) {
      var uid = decodeURIComponent(sa_id[1]);
      if (uid && (uid.substring(0, 1) === 'f' || uid.substring(0, 1) === 'd')) {
        if (this._.urlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64 && this._.urlSafeBase64.isUrlSafeBase64(uid)) {
          uid = uid.substring(0, 1) + _.base64Decode(this._.urlSafeBase64.decode(uid.substring(1)));
        } else if (this._.rot13defs) {
          uid = uid.substring(0, 1) + this._.rot13defs(uid.substring(1));
        }
      }
      return uid;
    } else {
      return '';
    }
  };

  siteLinker.setRefferId = function () {
    var distinct_id = this.store.getDistinctId();
    var urlId = this.getUrlId();
    if (urlId === '') {
      return false;
    }
    var isAnonymousId = urlId.substring(0, 1) === 'a' || urlId.substring(0, 1) === 'd';
    urlId = urlId.substring(1);

    if (urlId === distinct_id) {
      return false;
    }
    if (urlId && isAnonymousId && this.store.getFirstId()) {
      this.sd.identify(urlId, true);
      this.sd.saEvent.send(
        {
          original_id: urlId,
          distinct_id: distinct_id,
          type: 'track_signup',
          event: '$SignUp',
          properties: {}
        },
        null
      );
    }
    if (urlId && isAnonymousId && !this.store.getFirstId()) {
      this.sd.identify(urlId, true);
    }
    if (urlId && !isAnonymousId && !this.store.getFirstId()) {
      this.sd.login(urlId);
    }
  };

  siteLinker.addListen = function () {
    var that = this;
    var clickFn = function (event) {
      var target = event.target;
      var nodeName = target.tagName.toLowerCase();
      var parent_target = target.parentNode;
      var sasdk_url;
      var sasdk_target;
      if ((nodeName === 'a' && target.href) || (parent_target && parent_target.tagName && parent_target.tagName.toLowerCase() === 'a' && parent_target.href)) {
        if (nodeName === 'a' && target.href) {
          sasdk_url = target.href;
          sasdk_target = target;
        } else {
          sasdk_url = parent_target.href;
          sasdk_target = parent_target;
        }
        var location = that._.URL(sasdk_url);
        var protocol = location.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
          if (that.getPart(sasdk_url)) {
            that.rewireteUrl(sasdk_url, sasdk_target);
          }
        }
      }
    };
    that._.addEvent(document, 'mousedown', clickFn);
    if (!!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0) {
      that._.addEvent(document, 'pointerdown', clickFn);
    }
  };

  siteLinker.init = function (sd, option) {
    this.sd = sd;
    this._ = sd._;
    this.store = sd.store;
    this.para = sd.para;
    if (this._.isObject(option) && this._.isArray(option.linker) && option.linker.length > 0) {
      this.setRefferId();
      this.addListen();
    } else {
      sd.log('请配置打通域名参数！');
      return;
    }
    this.option = option.linker;
    this.option = resolveOption(this.option);

    function resolveOption(option) {
      var len = option.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        if (/[A-Za-z0-9]+\./.test(option[i].part_url) && Object.prototype.toString.call(option[i].after_hash) == '[object Boolean]') {
          arr.push(option[i]);
        } else {
          sd.log('linker 配置的第 ' + (i + 1) + ' 项格式不正确，请检查参数格式！');
        }
      }
      //option = arr;
      return arr;
    }
  };

  if (!_.isObject(window.SensorsDataWebJSSDKPlugin)) {
    window.SensorsDataWebJSSDKPlugin = {
      SiteLinker: siteLinker
    };
  } else {
    window.SensorsDataWebJSSDKPlugin.SiteLinker = window.SensorsDataWebJSSDKPlugin.SiteLinker || siteLinker;
  }

  return siteLinker;

}());


    if (typeof window['sensorsDataAnalytic201505'] === 'string') {
      //异步或者同步
      sd.setPreConfig(window[sensorsDataAnalytic201505]);
      window[sensorsDataAnalytic201505] = sd;
      window['sensorsDataAnalytic201505'] = sd;
      sd.init();
    } else if (typeof window['sensorsDataAnalytic201505'] === 'undefined') {
      //module模式，或者webpack打包
      window['sensorsDataAnalytic201505'] = sd;
      return sd;
    } else {
      //已经使用过以上两种方式的话
      return window['sensorsDataAnalytic201505'];
    }
  } catch (err) {
    if (typeof console === 'object' && console.log) {
      try {
        console.log(err);
      } catch (e) {
        sd.log(e);
      }
    }
  }
});
