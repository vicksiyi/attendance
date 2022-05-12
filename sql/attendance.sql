/*
 Navicat Premium Data Transfer

 Source Server         : 阿里云
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : 121.41.122.194:3306
 Source Schema         : attendance

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 16/04/2022 22:42:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增Id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '班级名称',
  `user_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '创建人ID',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `class_rel_user`(`user_uuid`) USING BTREE,
  CONSTRAINT `class_rel_user` FOREIGN KEY (`user_uuid`) REFERENCES `users` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classrooms
-- ----------------------------
DROP TABLE IF EXISTS `classrooms`;
CREATE TABLE `classrooms`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课堂名称',
  `class_id` int(0) NOT NULL COMMENT '班级ID',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classrooms_rel_class`(`class_id`) USING BTREE,
  CONSTRAINT `classrooms_rel_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classrooms_data
-- ----------------------------
DROP TABLE IF EXISTS `classrooms_data`;
CREATE TABLE `classrooms_data`  (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课堂名称',
  `classroom_id` int(0) NOT NULL COMMENT '课程ID',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件地址',
  `time` timestamp(0) NOT NULL COMMENT '上传时间',
  PRIMARY KEY (`uuid`) USING BTREE,
  INDEX `classrooms_data_rel_classrooms`(`classroom_id`) USING BTREE,
  CONSTRAINT `classrooms_data_rel_classrooms` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classrooms_data_rel_student
-- ----------------------------
DROP TABLE IF EXISTS `classrooms_data_rel_student`;
CREATE TABLE `classrooms_data_rel_student`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `student_id` int(0) NOT NULL COMMENT '用户ID',
  `classrooms_data_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '课堂ID',
  `starttime` timestamp(0) NOT NULL COMMENT '进入时间',
  `endtime` timestamp(0) NOT NULL COMMENT '退出时间',
  `time` int(0) NOT NULL DEFAULT 0 COMMENT '在线总时长/分钟',
  `status` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否确认提交',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `classrooms_data_rel_user_classrooms_data_uuid`(`classrooms_data_uuid`) USING BTREE,
  INDEX `classrooms_data_rel_user_student_id`(`student_id`) USING BTREE,
  CONSTRAINT `classrooms_data_rel_user_classrooms_data_uuid` FOREIGN KEY (`classrooms_data_uuid`) REFERENCES `classrooms_data` (`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `classrooms_data_rel_user_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生姓名',
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '学生学号',
  `class_id` int(0) NOT NULL COMMENT '班级ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `students_rel_class`(`class_id`) USING BTREE,
  CONSTRAINT `students_rel_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'uuid',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户邮箱',
  `passwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `time` timestamp(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Triggers structure for table class
-- ----------------------------
DROP TRIGGER IF EXISTS `class_trigger_time`;
delimiter ;;
CREATE TRIGGER `class_trigger_time` BEFORE INSERT ON `class` FOR EACH ROW BEGIN
			set new.time = NOW();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table classrooms_data
-- ----------------------------
DROP TRIGGER IF EXISTS `classrooms_data_trigger_uuid`;
delimiter ;;
CREATE TRIGGER `classrooms_data_trigger_uuid` BEFORE INSERT ON `classrooms_data` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table users
-- ----------------------------
DROP TRIGGER IF EXISTS `user_trigger_uuid`;
delimiter ;;
CREATE TRIGGER `user_trigger_uuid` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
			set new.uuid = UUID();
    END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
