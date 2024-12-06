/*
 Navicat Premium Dump SQL

 Source Server         : blog
 Source Server Type    : MySQL
 Source Server Version : 80034 (8.0.34)
 Source Host           : localhost:3306
 Source Schema         : egg

 Target Server Type    : MySQL
 Target Server Version : 80034 (8.0.34)
 File Encoding         : 65001

 Date: 06/12/2024 08:29:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authority_codes
-- ----------------------------
DROP TABLE IF EXISTS `authority_codes`;
CREATE TABLE `authority_codes`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '权限码',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限描述',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authority_codes
-- ----------------------------
INSERT INTO `authority_codes` VALUES (1, 'AC_1000001', '登录权限');
INSERT INTO `authority_codes` VALUES (2, 'AC_1000002', NULL);

-- ----------------------------
-- Table structure for role_codes
-- ----------------------------
DROP TABLE IF EXISTS `role_codes`;
CREATE TABLE `role_codes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles_id` int NULL DEFAULT NULL COMMENT '角色id',
  `code_id` int NULL DEFAULT NULL COMMENT '权限id authority_codes表id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_codes
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin', '管理员');
INSERT INTO `roles` VALUES (2, 'super', '超管');
INSERT INTO `roles` VALUES (3, 'user', '普通用户');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '123456' COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录token',
  `realName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `disable` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否禁用',
  PRIMARY KEY (`id`, `username` DESC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'wunan', '123456', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE3MzM0MTg0NjksImV4cCI6MTczMzQyMjA2OX0.ffH4FqBIXSVv744RBO0DPCv0LVWwnyD8uWplW9r1Iro', 'Wunan', NULL);
INSERT INTO `user` VALUES (2, 'vben', '123456', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoyLCJpYXQiOjE3MzM0MTgzNjIsImV4cCI6MTczMzQyMTk2Mn0.CaurzbcynqxzcUwnYE6hXDJiJyKf6ScEsFtbTQyKzh4', 'Vben', NULL);

-- ----------------------------
-- Table structure for user_codes
-- ----------------------------
DROP TABLE IF EXISTS `user_codes`;
CREATE TABLE `user_codes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `code_id` int NOT NULL COMMENT '权限id authority_codes表id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_codes
-- ----------------------------

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES (1, 1, 1);
INSERT INTO `user_roles` VALUES (2, 1, 2);
INSERT INTO `user_roles` VALUES (3, 1, 3);
INSERT INTO `user_roles` VALUES (4, 2, 1);
INSERT INTO `user_roles` VALUES (5, 2, 2);
INSERT INTO `user_roles` VALUES (6, 2, 3);

SET FOREIGN_KEY_CHECKS = 1;
